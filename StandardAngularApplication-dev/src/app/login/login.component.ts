import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  constructor(private route: Router, private fb: FormBuilder, private readonly snackBar: MatSnackBar, private service: ApiService) { }

  loginForm: any
  reqBody: any
  status: any
  toastColor: any
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  message: any
  snackBarRef: any

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  logIn() {
    if (this.loginForm.invalid) {
      console.log("invalid");
      const controls = this.loginForm.controls;
      console.log(controls);
      Object.keys(controls).forEach((key) => {
        controls[key].markAsTouched();
      });
    }
    else {
      this.reqBody = {
        "userName": this.loginForm.controls.userName.value,
        "password": this.loginForm.controls.password.value,
      }
      console.log(this.reqBody);
      this.service.postApi(environment.login, this.reqBody).subscribe((i: any) => {
        this.status = true
        this.message = "LogIn Successfully"
        this.toastColor = 'success_SnackBar'
        this.success(this.message)
        this.route.navigateByUrl('/dashboard')
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
      panelClass: [this.toastColor],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  error(message: string) {
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

  signUp() {
    this.route.navigateByUrl('/register')
  }

}
