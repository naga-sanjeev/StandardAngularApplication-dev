import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog'; // Import MatDialogModule and MatDialogRef
import { UserRegistrationComponent } from './user-registration.component';
import { ApiService } from '../services/api.service';
import { environment } from 'environments/environment';
import { of, throwError } from 'rxjs';
import { Validators } from '@angular/forms'
import { Router } from 'express';
import { UtilService } from '../services/util.service';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let util:UtilService
  let apiService: ApiService; // Declare apiService here
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<UserRegistrationComponent>>;
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open','close','success','putApi','postApi']);
    const spyMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [UserRegistrationComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatDialogModule, // Add MatDialogModule to the imports array
    
      ],
      providers: [
        ApiService,
        {
          provide: MatDialogRef,
          useValue: {} // Provide a mock MatDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {} // Provide a mock MatDialogRef
        },
        MatSnackBar,
        UserRegistrationComponent,
        { provide: MatSnackBar, useValue: spy},
        { provide: MatDialogRef, useValue: spyMatDialogRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    util=TestBed.inject(UtilService)
    fixture.detectChanges();
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    mockMatDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<UserRegistrationComponent>>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call when form is invalid',()=>{
    component.onUpdateItem()
  })
  it('should call when form is valid',()=>{
    const mockResponseBody={
      "userName": component.registerForm.controls.userName.value,
      "firstName": component.registerForm.controls.firstName.value,
      "lastName": component.registerForm.controls.lastName.value,
      "email": component.registerForm.controls.email.value,
      "phoneNumber": component.registerForm.controls.phoneNumber.value,
      "alternativeNumber": component.registerForm.controls.alternativeNumber.value,
      "password": component.registerForm.controls.password.value,
      "age": component.registerForm.controls.age.value
    }
    component.onUpdateItem()
  })
  it('should call when put api is hit',()=>{
    const mockResponseBody = {
      "userName": component.registerForm.controls.userName.value,
      "firstName": component.registerForm.controls.firstName.value,
      "lastName": component.registerForm.controls.lastName.value,
      "email": component.registerForm.controls.email.value,
      "phoneNumber": component.registerForm.controls.phoneNumber.value,
      "alternativeNumber": component.registerForm.controls.alternativeNumber.value,
      "password": component.registerForm.controls.password.value,
      "age": component.registerForm.controls.age.value
    }
    spyOn(component, 'getTableData'); // Add a spy for your data retrieval function
    component.ngOnInit();
    spyOn(apiService, 'putApi').and.returnValue(of(mockResponseBody));
    component.data={
      id:1
    }
    component.reqBody={
      'userName': 'sandy',
      "firstName": 'sanjeev',
      'lastName': 'madasu',
      'email': 'sanjeev@gmail.com',
      'phoneNumber': 9392378549,
      'alternativeNumber': 6587412895,
      'password': 'Sanjeev@123',
      'age': 25
    }
    component.registerForm.patchValue({
      'userName': 'sandy',
      "firstName": 'sanjeev',
      'lastName': 'madasu',
      'email': 'sanjeev@gmail.com',
      'phoneNumber': 9392378549,
      'alternativeNumber': 6587412895,
      'password': 'Sanjeev@123',
      'age': 25
    })
   
    component.onUpdateItem()
    expect(apiService.putApi).toHaveBeenCalledWith(jasmine.any(String), 1, jasmine.any(Object));
    expect(component.message).toEqual('Updated Successfully');
    expect(component.toastColor).toEqual('success_SnackBar');
    expect(component.getTableData).toHaveBeenCalled(); // Ensure getTableData is called
    expect(mockMatDialogRef.close).toHaveBeenCalled(); // Ensure the dialog is closed
  
  });

  it('should call when form is invalid',()=>{
    component.onAddNewItem()
  })
  it('should call when form is valid',()=>{
    const mockResponseBody={
      "userName": component.registerForm.controls.userName.value,
      "firstName": component.registerForm.controls.firstName.value,
      "lastName": component.registerForm.controls.lastName.value,
      "email": component.registerForm.controls.email.value,
      "phoneNumber": component.registerForm.controls.phoneNumber.value,
      "alternativeNumber": component.registerForm.controls.alternativeNumber.value,
      "password": component.registerForm.controls.password.value,
      "age": component.registerForm.controls.age.value
    }
    component.onAddNewItem()
  })
 
  it('should call when post api is hit',()=>{
    const mockResponseBody = {
      "userName": component.registerForm.controls.userName.value,
      "firstName": component.registerForm.controls.firstName.value,
      "lastName": component.registerForm.controls.lastName.value,
      "email": component.registerForm.controls.email.value,
      "phoneNumber": component.registerForm.controls.phoneNumber.value,
      "alternativeNumber": component.registerForm.controls.alternativeNumber.value,
      "password": component.registerForm.controls.password.value,
      "age": component.registerForm.controls.age.value
    }

    component.registerForm.patchValue({
      'userName': 'sandy',
      "firstName": 'sanjeev',
      'lastName': 'madasu',
      'email': 'sanjeev@gmail.com',
      'phoneNumber': 9392378549,
      'alternativeNumber': 6587412895,
      'password': 'Sanjeev@123',
      'age': 25
    })

    spyOn(apiService, 'postApi').and.returnValue(of(mockResponseBody));
    component.onAddNewItem()
    expect(apiService.postApi).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
    expect(component.message).toEqual('Registraion Success');
    expect(component.toastColor).toEqual('success_SnackBar');
  });
  it('should handle error onAddNewItem()', () => {
    const errorResponse = { responseHead: { statusCode: 404, statusDesc: 'Not Found' } };
    spyOn(apiService, 'postApi').and.returnValue(of(errorResponse));

    spyOn(util,'getIntlErrorMessage')
    component.reqBody = { 
      'userName': 'sandy',
      "firstName": 'sanjeev',
      'lastName': 'madasu',
      'email': 'sanjeev@gmail.com',
      'phoneNumber': 9392378549,
      'alternativeNumber': 6587412895,
      'password': 'Sanjeev@123',
      'age': 25
    };
   component.onAddNewItem()
    
  });

  it('should initialize the form with the correct form controls', () => {
    expect(component.registerForm.get('firstName')).toBeTruthy();
    expect(component.registerForm.get('lastName')).toBeTruthy();
    expect(component.registerForm.get('email')).toBeTruthy();
    expect(component.registerForm.get('phoneNumber')).toBeTruthy();
    expect(component.registerForm.get('alternativeNumber')).toBeTruthy();
    expect(component.registerForm.get('age')).toBeTruthy();
    expect(component.registerForm.get('userName')).toBeTruthy();
    expect(component.registerForm.get('password')).toBeTruthy();
  });
  it('should mark firstName as invalid if it is touched and empty', () => {
    const firstNameControl = component.registerForm.get('firstName');
    firstNameControl.setValue('');
    firstNameControl.markAsTouched();
    expect(firstNameControl.invalid).toBeTruthy();
  });
  
  it('should mark email as invalid if it is touched and not a valid email', () => {
    const emailControl = component.registerForm.get('email');
    emailControl.setValue('invalid-email');
    emailControl.markAsTouched();
    expect(emailControl.invalid).toBeTruthy();
  });
  
 
  it('should retrieve data when the component is initialized', () => {
    spyOn(component, 'getTableData'); // Add a spy for your data retrieval function
    component.ngOnInit();
    expect(component.getTableData).toHaveBeenCalled();
  });
  
  
  it('should mark email control as invalid for an invalid email', () => {
    const emailControl = component.registerForm.get('email');
    emailControl.setValue('invalid-email');
    emailControl.markAsTouched();
    expect(emailControl.invalid).toBeTruthy();
  });
  
  it('should mark firstName as invalid if it is empty and touched', () => {
    const firstNameControl = component.registerForm.get('firstName');
    firstNameControl.setValue('');
    firstNameControl.markAsTouched();
    expect(firstNameControl.invalid).toBeTruthy();
  });
  it('should mark lastName as invalid if it is empty and touched', () => {
    const firstNameControl = component.registerForm.get('lastName');
    firstNameControl.setValue('');
    firstNameControl.markAsTouched();
    expect(firstNameControl.invalid).toBeTruthy();
  });
  it('should mark phoneNumber as invalid if it is empty and touched', () => {
    const firstNameControl = component.registerForm.get('phoneNumber');
    firstNameControl.setValue('');
    firstNameControl.markAsTouched();
    expect(firstNameControl.invalid).toBeTruthy();
  });
  it('should mark age as invalid if it is empty and touched', () => {
    const firstNameControl = component.registerForm.get('age');
    firstNameControl.setValue('');
    firstNameControl.markAsTouched();
    expect(firstNameControl.invalid).toBeTruthy();
  });
  it('should mark userName as invalid if it is empty and touched', () => {
    const firstNameControl = component.registerForm.get('userName');
    firstNameControl.setValue('');
    firstNameControl.markAsTouched();
    expect(firstNameControl.invalid).toBeTruthy();
  });
  it('should mark password as invalid if it is empty and touched', () => {
    const firstNameControl = component.registerForm.get('password');
    firstNameControl.setValue('');
    firstNameControl.markAsTouched();
    expect(firstNameControl.invalid).toBeTruthy();
  });
  it('should retrieve data when the component is initialized', () => {
    spyOn(component, 'getTableData'); // Add a spy for your data retrieval function
    component.ngOnInit();
    expect(component.getTableData).toHaveBeenCalled();
  });
  it('should bind form controls to component properties', () => {
    component.data = { firstName: 'John', lastName: 'Doe', email: 'john@example.com',phoneNumber: '1234567891',
    alternativeNumber: '7894561231',
    age: 25,
    userName: 'testing',
    password: '' }; // Set test data
    fixture.detectChanges(); // Trigger change detection
    expect(component.registerForm.value).toEqual(component.data); // Check if form values match data
  });
  it('add new item retrieve data when the component is initialized', () => {
    spyOn(component, 'onAddNewItem'); // Add a spy for your data retrieval function
    component.onAddNewItem();
    expect(component.onAddNewItem).toHaveBeenCalled();
  });
  it('Update item retrieve data when the component is initialized', () => {
    spyOn(component, 'onUpdateItem'); // Add a spy for your data retrieval function
    component.onUpdateItem();
    expect(component.onUpdateItem).toHaveBeenCalled();
  });
  
  
  it('should handle form validation errors', () => {
    // Simulate form submission with invalid data
    component.registerForm.setValue({
    firstName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      lastName: ['', [Validators.pattern('^[a-zA-Z]*'), Validators.maxLength(30), Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("([0-9]{10}$)")]],
      alternativeNumber: ['', [Validators.pattern("^[0-9]{10}$"),]],
      age: ['', [Validators.pattern("^[0-9]{2}$"), Validators.required]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.minLength(8), Validators.required, Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)]],
    })

    //component.submit();
    // Check if the error messages are displayed for invalid fields
    expect(component.registerForm.get('firstName').invalid).toBe(true);
    expect(component.registerForm.get('lastName').invalid).toBe(true);
    expect(component.registerForm.get('email').invalid).toBe(true);
    expect(component.registerForm.get('phoneNumber').invalid).toBe(true);
    expect(component.registerForm.get('alternativeNumber').invalid).toBe(true);
    expect(component.registerForm.get('age').invalid).toBe(true);
    expect(component.registerForm.get('userName').invalid).toBe(true);
    expect(component.registerForm.get('password').invalid).toBe(true);
    
  });
 

  it('should create registration form with default values', () => {
    // Simulate data with no values
    component.data = {};
  
    // Call the method
    component.registration();
  
    // Assert the form controls are set correctly
    expect(component.registerForm.get('firstName').invalid).toBe(true);
    expect(component.registerForm.get('lastName').invalid).toBe(true);
    expect(component.registerForm.get('email').invalid).toBe(true);
    expect(component.registerForm.get('phoneNumber').invalid).toBe(true);
    expect(component.registerForm.get('alternativeNumber').invalid).toBe(false);
    expect(component.registerForm.get('age').invalid).toBe(true);
    expect(component.registerForm.get('userName').invalid).toBe(true);
    expect(component.registerForm.get('password').invalid).toBe(true);
    // ... assert other form controls with default values
  });
  
  it('should create registration form with provided values when isEditing is false', () => {
    // Simulate data when not in edit mode
    component.data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567891',
      alternativeNumber: '7894561231',
      age: 25,
      userName: 'testing',
      password: 'Testing@123',
      isEditing: false // Ensure isEditing is set to false
    };
  
    // Call the method
    component.registration();
  
    // Assert the form controls are set correctly with provided values
    expect(component.registerForm.get('firstName').invalid).toBe(false);
    expect(component.registerForm.get('lastName').invalid).toBe(false);
    expect(component.registerForm.get('email').invalid).toBe(false);
    expect(component.registerForm.get('phoneNumber').invalid).toBe(false);
    expect(component.registerForm.get('alternativeNumber').invalid).toBe(false);
    expect(component.registerForm.get('age').invalid).toBe(false);
    expect(component.registerForm.get('userName').invalid).toBe(false);
    expect(component.registerForm.get('password').invalid).toBe(false);
    // ... assert other form controls with provided values
  });
  
  it('should create registration form with provided values when isEditing is true', () => {
    // Simulate data when in edit mode
    component.data = {
      
          firstName: 'Updated John',
          lastName: 'Updated Doe',
          email: 'updatedjohn@example.com',
          phoneNumber: '1234567891',
          alternativeNumber: '7894561231',
          age: 25,
          userName: 'testing',
          password: 'Testing@123',
          isEditing: true // Ensure isEditing is set to true
    };
  
    // Call the method
    component.registration();
  
    expect(component.registerForm.get('firstName').invalid).toBe(true);
    expect(component.registerForm.get('lastName').invalid).toBe(true);
    expect(component.registerForm.get('email').invalid).toBe(false);
    expect(component.registerForm.get('phoneNumber').invalid).toBe(false);
    expect(component.registerForm.get('alternativeNumber').invalid).toBe(false);
    expect(component.registerForm.get('age').invalid).toBe(false);
    expect(component.registerForm.get('userName').invalid).toBe(false);
   expect(component.registerForm.get('password').invalid).toBe(false);
    // ... assert other form controls with provided values
  });
  it('should set message and call success function when status is true', () => {
    // Arrange
    component.status = true;
    spyOn(component, 'success');
  
    // Act
    component.statusFunction();
  
    // Assert
    expect(component.message).toBe('registraion success');
    expect(component.success).toHaveBeenCalledWith('registraion success');
  });
  
  it('should call openSnackBar with the correct parameters for success message', () => {
    const service = TestBed.inject(UserRegistrationComponent);
    const message = 'This is a success message';
    service.success(message);
    // Expectations
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, '', {
      duration: 2000,
      panelClass: [],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  });
  it('should call openSnackBar for error message', () => {
    const service = TestBed.inject(UserRegistrationComponent);
    const message = 'This is a error message';
    service.error(message);
    // Expectations
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, '', {
      duration: 2000,
      panelClass: [],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  });
});
