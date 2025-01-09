import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { data } from 'jquery';
import { UtilService } from 'app/shared/services/util.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  //dialogRef: any;

  constructor(private fb: FormBuilder, private router: Router, private service: ApiService,private util: UtilService, private readonly snackBar: MatSnackBar,public dialogRef: MatDialogRef<UserRegistrationComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  registerForm: FormGroup
  usersData = []
  public hide = true;
  status: boolean = true
  message = ''
  reqBody: any;
  disableBtn = false;
  toastColor: any;
  modalTitle="Update Profle";
  private subscription: Subscription;
  tableData: any;
  isLoading: boolean;
  serviceError: any;
  // shouldShowUpdateButton = false;
  // add = false;
  ngOnInit(): void {

    this.registration();
    this.getTableData();
  }

  registration() {
    console.log("userData", this.data);
    const passwordLength = this.data?.isEditing ? 60 : 20;
    this.registerForm = this.fb.group({
      firstName: [this.data?.firstName || "",  [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      lastName: [this.data?.lastName || "" ,  [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      email: [this.data?.email || "",  [Validators.required, Validators.email, Validators.maxLength(50)]],
      phoneNumber: [this.data?.phoneNumber|| "",  [Validators.required, Validators.pattern("([0-9]{10}$)")]],
      alternativeNumber: [this.data?.alternativeNumber || "", [Validators.pattern("^[0-9]{10}$"),]],
      age: [this.data?.age || "", [Validators.pattern("^[0-9]{2}$"), Validators.required]],
      userName: [this.data?.userName || "", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: [this.data?.password || "", [Validators.minLength(8), Validators.required, Validators.maxLength(passwordLength), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)]],
    })
  }
  getTableData(){
    this.subscription = this.service.getApi(environment.listOfUsers).subscribe((data: any) => {
      console.log("This is table data",data.respones);
      this.tableData = data.respones;
    },
      (err: any) => {
        if (err.responseHead) {
          this.serviceError = this.util.getIntlErrorMessage("TABLE_LIST", err.responseHead.statusCode, err.responseHead.statusDesc);
        }
      }
    );
  }
  // home() {
  //   this.router.navigateByUrl('/login')
  // }

  onUpdateItem() {
    // this.shouldShowUpdateButton = true;
    isEditing: true 
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
        "alternativeNumber": this.registerForm.controls.alternativeNumber.value,
        "password": this.registerForm.controls.password.value,
        "age": this.registerForm.controls.age.value
      }
      //console.log(this.reqBody);
      // onUpdateItem(updatedItem: any,) {
        //console.log("url", environment.updateTableData);
        //console.log("id", id);
      this.subscription = this.service.putApi(environment.updateTableData,this.data.id,this.reqBody).subscribe(
        (data) => {
          console.log("This is updated data", data);
          this.message = 'Updated Successfully'
            this.toastColor = 'success_SnackBar'
            this.success(this.message);
            this.getTableData(); // Refresh the table data after deletion
            this.dialogRef.close();
          
        },
        (err: any) => {
          if (err.responseHead) {
            this.serviceError = this.util.getIntlErrorMessage("TABLE_LIST", err.responseHead.statusCode, err.responseHead.statusDesc);
          }
        }
      );
      }

    }
    
    onAddNewItem()
    {
      isEditing: false
      // this.add=true;
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
            "alternativeNumber": this.registerForm.controls.alternativeNumber.value,
            "password": this.registerForm.controls.password.value,
            "age": this.registerForm.controls.age.value
          }
          //console.log(this.reqBody);
          // onUpdateItem(updatedItem: any,) {
            //console.log("url", environment.updateTableData);
            //console.log("id", id);
        
          console.log(this.reqBody);
          this.service.postApi(environment.register, this.reqBody).subscribe((i: any) => {
            // this.router.navigateByUrl('/login')
            this.message = 'Registraion Success'
            this.toastColor = 'success_SnackBar'
            this.success(this.message)
            this.getTableData(); // Refresh the table data after deletion
            this.dialogRef.close();
              
            },
            (err: any) => {
              if (err.responseHead) {
                this.serviceError = this.util.getIntlErrorMessage("TABLE_LIST", err.responseHead.statusCode, err.responseHead.statusDesc);
              }
            }
          );
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

