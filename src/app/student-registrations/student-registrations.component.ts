import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-student-registrations',
  standalone: false,
  templateUrl: './student-registrations.component.html',
  styleUrl: './student-registrations.component.scss'
})
export class StudentRegistrationsComponent implements OnInit {
  courseTypes: any[] = [];
  courses: any[] = [];
  newRegistration: any = {
    id: 0,
    studentName: '',
    email: '',
    courseTypeId: 0,
    courseId: 0,
    offeringDays: 0,
    courseOfferingId: 0
  };

  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit(): void {
    
    
  }

  async register() {
    if (
      this.newRegistration.studentName &&
      this.newRegistration.email &&
      this.newRegistration.courseTypeId &&
      this.newRegistration.courseId &&
      this.newRegistration.offeringDays
    ) {
      try {
        const registrationData = { ...this.newRegistration };
        console.log('Sending registration:', registrationData);
        const result = await firstValueFrom(this.dataService.addRegistration(registrationData));
        console.log('Registration result:', result);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    } else {
      console.log('Validation failed:', this.newRegistration);
    }
  }
}