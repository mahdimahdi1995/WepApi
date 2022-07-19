import { AfterContentChecked, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit, AfterContentChecked {
  studentsList: Student[];

  constructor(private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentService.getStudentList().subscribe(s => {
      this.setStudents(s);
      console.log(this.studentsList);
    })
  }
  ngAfterContentChecked() {
    // this.studentService.getStudentList().subscribe(s => {
    //   this.setStudents(s);
    //   console.log(this.studentsList);
    // })
  }

  removeStudent(student) {
    if (confirm("Are you sure to delete " + student.name)) {
      this.studentService.deleteStudent(student);
    }
  }

  onEdit(id) {
    let index = this.studentService.getIndex(id, this.studentsList)
    this.router.navigate(['update-student/' + index]);
  }

  setStudents(_students: Student[]) {
    this.studentsList = _students;
  }

}
