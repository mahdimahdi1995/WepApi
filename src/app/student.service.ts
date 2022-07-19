import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[];
  constructor(private http: HttpClient) { }

  getStudentDoc(id) {
    return this.http
      .get<Student>(
        'https://students-a8874-default-rtdb.firebaseio.com/students/' + id + '.json');
  }

  getStudentList() {
    return this.http.get<Student[]>('https://students-a8874-default-rtdb.firebaseio.com/students.json')
  }
  

  createStudent(student: Student) {
    let students: any[] = [];
    this.getStudentList().subscribe(s => {
      if (s) {
        students = s;
        console.log(students);
        students.push(student);
        this.http.put<any>('https://students-a8874-default-rtdb.firebaseio.com/students.json',
          students).subscribe(s => this.updateDatabase());
      }
      else {
        students.push(student);
        this.http.put<any>('https://students-a8874-default-rtdb.firebaseio.com/students.json',
          students).subscribe(s => console.log(s));
      }

    })

  }

  deleteStudent(student: Student) {
    let students: Student[];
    this.getStudentList().subscribe(s => {
      students = s;
      console.log(students);
      let index = students.findIndex(s => s.id === student.id);
      console.log(index);
      this.http
        .delete(
          'https://students-a8874-default-rtdb.firebaseio.com/students/' + index + '.json')
        .subscribe(response => {
          this.updateDatabase();
        });
    });

  }

  updateStudent(student: Student, id) {
    return this.http
      .put<Student>(
        'https://students-a8874-default-rtdb.firebaseio.com/students/' + id + '.json',
        student).subscribe(s => this.updateDatabase());
  }

  deleteAll() {
    return this.http.delete('https://students-a8874-default-rtdb.firebaseio.com/students.json');
  }

  updateDatabase() {
    this.getStudentList().subscribe(data => {
      let students: any[] = [];
      if (data) {
        for (let s of data) {
          if (s) { students.push(s); }
        }
        this.http.put<any>('https://students-a8874-default-rtdb.firebaseio.com/students.json',
          students).subscribe();
      }
    })
  }

  getIndex(id: any, students: Student[]) {
    let index = students.findIndex(student => student.id === id);
    return index;
  }

  setStudents(students: any) {
    this.students = students;
  }

}
