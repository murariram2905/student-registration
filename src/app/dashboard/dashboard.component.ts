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
  editingField: string | null = null;
  message = '';

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getRegistrations().subscribe(data => {
      this.registration = data[data.length - 1] || null;
    });
  }

  edit(field: string) {
    this.editingField = field;
  }

  save() {
    this.dataService.updateRegistration(this.registration).subscribe(() => {
      this.message = "Updated successfully!";
      this.editingField = null;
      setTimeout(() => this.message = '', 2000);
    });
  }

  deleteField(field: string) {
    this.dataService.deleteField(this.registration, field).subscribe(() => {
      this.message = "Field cleared!";
      setTimeout(() => this.message = '', 2000);
    });
  }

  logout() {
    this.router.navigate(['/']);
  }
}