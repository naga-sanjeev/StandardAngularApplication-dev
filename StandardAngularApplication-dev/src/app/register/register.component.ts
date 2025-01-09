import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, private router: Router, private service: ApiService, private readonly snackBar: MatSnackBar) { }

  registerForm: FormGroup
  gender
  usersData = []
  public hide = true;
  status: boolean = true
  message = ''
  reqBody: any;
  disableBtn = false;
  toastColor: any;

  ngOnInit(): void {
    this.registration();
  }

  registration() {
    this.gender = [
      { gen: 'male' },
      { gen: 'female' }
    ]
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      lastName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("([0-9]{10}$)")]],
      alternativeNumber: ['', [Validators.pattern("^[0-9]{10}$"),]],
      age: ['', [Validators.pattern("^[0-9]{2}$"), Validators.required]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.minLength(8), Validators.required, Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)]],
    })
  }

  loginpage() {
    this.router.navigateByUrl('/login')
  }

  submit() {
    if (this.registerForm.invalid) {
      console.log("invalid");
      const controls = this.registerForm.controls;
      console.log(controls);
      Object.keys(controls).forEach((key) => {
        controls[key].markAsTouched();
      });
    }
    else {
      this.reqBody = {
        "userName": this.registerForm.controls.userName.value,
        "firstName": this.registerForm.controls.firstName.value,
        "lastName": this.registerForm.controls.lastName.value,
        "email": this.registerForm.controls.email.value,
        "phoneNumber": this.registerForm.controls.phoneNumber.value,
        "password": this.registerForm.controls.password.value,
        "age": this.registerForm.controls.age.value
      }
      console.log(this.reqBody);
      this.service.postApi(environment.register, this.reqBody).subscribe((i: any) => {
        this.router.navigateByUrl('/login')
        this.message = 'Registraion Success'
        this.toastColor = 'success_SnackBar'
        this.success(this.message)
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 409) {
          this.message = 'invalid inputs'
          this.toastColor = 'error_SnackBar'
          this.error(this.message)
        } else {
          this.message = 'An error occurred. Please try again later.'
          this.toastColor = 'error_SnackBar'
          this.error(this.message)
        }
      })
        
    }
  }

  openSnackBar(message: string, action: string, className = '', duration = 2000) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  error(message: string) {
    console.log(message);
    this.openSnackBar(message, '', 'error-snackbar');
  }

  success(message: string) {
    this.openSnackBar(message, '', 'success-snackbar');
  }

  statusFunction() {
    if (this.status == true) {
      this.message = 'registraion success'
      this.success(this.message)
    }
  }

}
