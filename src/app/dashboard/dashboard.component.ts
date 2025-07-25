import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  registration: any = null;
  courseTypes: any[] = [];
  courses: any[] = [];
  filteredRegistrations: any[] = [];
  editing: { [key: string]: boolean } = {
    studentName: false,
    email: false,
    courseTypeId: false,
    courseId: false,
    offeringDays: false
  };
  updateMessage: string = '';
  isDataLoaded: boolean = false;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    combineLatest([
      this.dataService.getRegistrations(),
    ]).subscribe({
      next: ([registrations]) => {
        console.log('Registrations received:', registrations);
        this.registration = registrations.length > 0 ? registrations[registrations.length - 1] : null;
        if (this.registration) {
          this.filteredRegistrations = registrations.filter(
            (reg: any) => reg.courseTypeId === this.registration.courseTypeId &&
                          reg.courseId === this.registration.courseId &&
                          reg.courseOfferingId === this.registration.courseOfferingId
          );
        }
        if (!this.registration && registrations.length > 0) {
          setTimeout(() => this.refreshData(), 500);
        } else {
          this.isDataLoaded = true;
        }
      },
      error: (error) => console.error('Error loading data:', error)
    });
  }

  editField(field: string) {
    this.editing[field] = !this.editing[field];
  }

  updateRegistration() {
    if (this.registration) {
      if (!this.registration.studentName && this.editing['studentName']) {
        this.updateMessage = 'Name cannot be empty.';
        return;
      }
      if (!this.registration.email && this.editing['email']) {
        this.updateMessage = 'Email cannot be empty.';
        return;
      }
      if (this.editing['courseTypeId'] && this.registration.courseTypeId === 0) {
        this.updateMessage = 'Please select a course type.';
        return;
      }
      if (this.editing['courseId'] && this.registration.courseId === 0) {
        this.updateMessage = 'Please select a course.';
        return;
      }
      if (this.editing['offeringDays'] && this.registration.offeringDays === 0) {
        this.updateMessage = 'Please select a duration.';
        return;
      }

      this.dataService.updateRegistration(this.registration).subscribe(() => {
        this.updateMessage = 'Registration updated successfully!';
        setTimeout(() => this.updateMessage = '', 2000);
        Object.keys(this.editing).forEach(key => this.editing[key] = false);
        this.dataService.getRegistrations().subscribe(registrations => {
          this.filteredRegistrations = registrations.filter(
            (reg: any) => reg.courseOfferingId === this.registration.courseOfferingId
          );
        });
      });
    }
  }

  deleteField(field: string) {
    if (this.registration && confirm('Are you sure you want to clear this field?')) {
      if (field === 'studentName') this.registration.studentName = '';
      if (field === 'email') this.registration.email = '';
      if (field === 'courseTypeId') this.registration.courseTypeId = 0;
      if (field === 'courseId') this.registration.courseId = 0;
      if (field === 'offeringDays') this.registration.offeringDays = 0;
      this.dataService.updateRegistration(this.registration).subscribe(() => {
        this.updateMessage = 'Field cleared successfully!';
        setTimeout(() => this.updateMessage = '', 2000);
      });
    }
  }

 

  logout() {
    this.router.navigate(['/']);
  }
}