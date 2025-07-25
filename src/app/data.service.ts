// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private courseTypes: any[] = [];
  private courses: any[] = [];
  private courseOfferings: any[] = [];
  private registrations: any[] = [];

  getCourseTypes(): Observable<any[]> {
    return of(this.courseTypes);
  }

  addCourseType(courseType: any): Observable<any> {
    courseType.id = this.courseTypes.length + 1;
    this.courseTypes.push(courseType);
    return of(courseType);
  }

  updateCourseType(courseType: any): Observable<any> {
    const index = this.courseTypes.findIndex(ct => ct.id === courseType.id);
    if (index !== -1) {
      this.courseTypes[index] = courseType;
    }
    return of(courseType);
  }

  deleteCourseType(id: number): Observable<void> {
    this.courseTypes = this.courseTypes.filter(ct => ct.id !== id);
    return of(void 0);
  }

  getCourses(): Observable<any[]> {
    return of(this.courses);
  }

  addCourse(course: any): Observable<any> {
    course.id = this.courses.length + 1;
    this.courses.push(course);
    return of(course);
  }

  updateCourse(course: any): Observable<any> {
    const index = this.courses.findIndex(c => c.id === course.id);
    if (index !== -1) {
      this.courses[index] = course;
    }
    return of(course);
  }

  deleteCourse(id: number): Observable<void> {
    this.courses = this.courses.filter(c => c.id !== id);
    return of(void 0);
  }

  getCourseOfferings(): Observable<any[]> {
    return of(this.courseOfferings);
  }

  addCourseOffering(offering: any): Observable<any> {
    offering.id = this.courseOfferings.length + 1;
    const course = this.courses.find(c => c.id === offering.courseId);
    const courseType = this.courseTypes.find(ct => ct.id === offering.courseTypeId);
    offering.name = `${courseType?.name} - ${course?.name}`;
    this.courseOfferings.push(offering);
    return of(offering);
  }

  updateCourseOffering(offering: any): Observable<any> {
    const index = this.courseOfferings.findIndex(co => co.id === offering.id);
    if (index !== -1) {
      const course = this.courses.find(c => c.id === offering.courseId);
      const courseType = this.courseTypes.find(ct => ct.id === offering.courseTypeId);
      offering.name = `${courseType?.name} - ${course?.name}`;
      this.courseOfferings[index] = offering;
    }
    return of(offering);
  }

  deleteCourseOffering(id: number): Observable<void> {
    this.courseOfferings = this.courseOfferings.filter(co => co.id !== id);
    return of(void 0);
  }

  getRegistrations(): Observable<any[]> {
    return of(this.registrations);
  }

  addRegistration(registration: any): Observable<any> {
    registration.id = this.registrations.length + 1;
    const existingOffering = this.courseOfferings.find(
      co => co.courseId === registration.courseId && co.courseTypeId === registration.courseTypeId
    );
    if (!existingOffering) {
      const newOffering = {
        id: 0,
        courseId: registration.courseId,
        courseTypeId: registration.courseTypeId
      };
      this.addCourseOffering(newOffering).subscribe(offering => {
        registration.courseOfferingId = offering.id;
      });
    } else {
      registration.courseOfferingId = existingOffering.id;
    }
    this.registrations.push(registration);
    return of(registration);
  }

  updateRegistration(registration: any): Observable<any> {
    const index = this.registrations.findIndex(r => r.id === registration.id);
    if (index !== -1) {
      const existingOffering = this.courseOfferings.find(
        co => co.courseId === registration.courseId && co.courseTypeId === registration.courseTypeId
      );
      if (!existingOffering) {
        const newOffering = {
          id: 0,
          courseId: registration.courseId,
          courseTypeId: registration.courseTypeId
        };
        this.addCourseOffering(newOffering).subscribe(offering => {
          registration.courseOfferingId = offering.id;
          this.registrations[index] = registration;
        });
      } else {
        registration.courseOfferingId = existingOffering.id;
        this.registrations[index] = registration;
      }
    }
    return of(registration);
  }

  deleteRegistration(id: number): Observable<void> {
    this.registrations = this.registrations.filter(r => r.id !== id);
    return of(void 0);
  }

  getRegistrationsByCourseOffering(courseOfferingId: number): Observable<any[]> {
    return of(this.registrations.filter(r => r.courseOfferingId === courseOfferingId));
  }
}