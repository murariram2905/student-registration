import { Component,OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-student-registrations',
  standalone: false,
  templateUrl: './student-registrations.component.html',
  styleUrl: './student-registrations.component.scss'
})
export class StudentRegistrationComponent {
registration = {
    studentName: '',
    email: '',
    courseType: '',
    course: '',
    durationDays: 0
  };

  constructor(private dataService: DataService, private router: Router) {}

  submit() {
    if (this.registration.studentName && this.registration.email && this.registration.courseType && this.registration.course && this.registration.durationDays) {
      this.dataService.addRegistration(this.registration).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      alert("Please fill all fields");
    }
  }
}