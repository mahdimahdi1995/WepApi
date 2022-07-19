import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  public studentForm: FormGroup;
  public id : string;

  constructor(
    public studentService: StudentService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.id = UUID.UUID();
    console.log(this.id);
    this.studentForm = this.formBuilder.group({
      id: this.id,
      name: ['', Validators.required ],
      email: [''],
      student_course: [''],
      fees: ['']
    });
    console.log(this.studentForm);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.studentService.createStudent(this.studentForm.value);
    this.router.navigate(['list-student']);
  };

}
