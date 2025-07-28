import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private registrations: any[] = [];

  getRegistrations(): Observable<any[]> {
    return of(this.registrations);
  }

  addRegistration(reg: any): Observable<any> {
    reg.id = this.registrations.length + 1;
    this.registrations.push(reg);
    return of(reg);
  }

  updateRegistration(updatedReg: any): Observable<any> {
    const index = this.registrations.findIndex(r => r.id === updatedReg.id);
    if (index !== -1) {
      this.registrations[index] = { ...updatedReg };
    }
    return of(updatedReg);
  }

  deleteField(reg: any, field: string): Observable<any> {
    if (reg && reg.hasOwnProperty(field)) {
      reg[field] = field.includes('Days') ? 0 : '';
    }
    return this.updateRegistration(reg);
  }
}
