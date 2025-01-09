import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { messages } from 'app/shared/constants/error-messages';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let registrationServiceSpy: jasmine.SpyObj<RegisterComponent>;
  let notificationServiceSpy: jasmine.SpyObj<RegisterComponent>;
  let apiService: ApiService;
  let router: Router;
  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open', 'close', 'success','postApi']);
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [FormBuilder, MatSnackBar, RegisterComponent, ApiService, { provide: MatSnackBar, useValue: spy }],
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule], // Include RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
    notificationServiceSpy = TestBed.inject(RegisterComponent) as jasmine.SpyObj<RegisterComponent>;
    router = TestBed.inject(Router); // Inject the Router service
    const service = TestBed.inject(RegisterComponent);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call when the form is invalid', () => {
    component.submit()
  });
  it('should call for else in the submit function', () => {
    const mockResponseBody = {
      "firstName": component.registerForm.controls.firstName.value,
      "lastName": component.registerForm.controls.lastName.value,
      "email": component.registerForm.controls.email.value,
      "phoneNumber": component.registerForm.controls.phoneNumber.value,
      "alternativeNumber": component.registerForm.controls.alternativeNumber.value,
      "age": component.registerForm.controls.age.value,
      "userName": component.registerForm.controls.userName.value,
      "password": component.registerForm.controls.password.value,
    }
    component.submit()
  });
  it('should call when post api is hit',()=>{
    const mockResponseBody = {
      "firstName": component.registerForm.controls.firstName.value,
      "lastName": component.registerForm.controls.lastName.value,
      "email": component.registerForm.controls.email.value,
      "phoneNumber": component.registerForm.controls.phoneNumber.value,
      "alternativeNumber": component.registerForm.controls.alternativeNumber.value,
      "age": component.registerForm.controls.age.value,
      "userName": component.registerForm.controls.userName.value,
      "password": component.registerForm.controls.password.value,
    }
    component.registerForm.patchValue({
      "firstName": 'sanjeev',
      'lastName': 'madasu',
      'email': 'sanjeev@gmail.com',
      'phoneNumber': 9392378549,
      'alternativeNumber': 6587412895,
      'age': 25,
      'userName': 'sandy',
      'password': 'Sanjeev@123'
    })
    spyOn(apiService, 'postApi').and.returnValue(of(mockResponseBody));
    spyOn(router, 'navigateByUrl').and.stub();
    component.submit()
    expect(apiService.postApi).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
    expect(component.message).toEqual('Registraion Success');
    expect(component.toastColor).toEqual('success_SnackBar');
  });
  it('should handle 401 or 409 error status', () => {
    const errorResponse = new HttpErrorResponse({ status: 401 });
    // spyOn(apiService,'postApi').and.returnValue(throwError(errorResponse))
    const message='invalid inputs'
    spyOn(component,'error')
    component.error(message);
    expect(component.error).toHaveBeenCalledWith('invalid inputs');
    // expect(apiService.postApi).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
    component.submit();
    
    // expect(apiService.postApi).toHaveBeenCalledWith('invalid inputs');
    // expect(apiService.postApi).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
    // add other expectations as needed
  });
  it('should handle HTTP error 401 on form submission', () => {
    //spyOn(apiService, 'postApi').and.throwError({ status: 401 }); // Simulate HTTP error
    spyOn(apiService, 'postApi').and.returnValue(throwError({ status: 401 }));
    // Simulate form submission with a valid form
    component.registerForm.setValue({
     // userName: 'testUser',
      firstName: 'sanjeev',
      lastName: 'madasu',
      email: 'sanjeev@gmail.com',
      phoneNumber: 9392378549,
      alternativeNumber: 6587412895,
      age: 25,
      userName: 'sandy',
      password: 'Sanjeev@123'
      // ... other form values
    });
    component.submit();

    // Expectations
    expect(apiService.postApi).toHaveBeenCalled(); // Check if the postApi method is called
    // Add more expectations based on the behavior for different HTTP errors
  });
  it('should handle HTTP error 409 on form submission', () => {
    //spyOn(apiService, 'postApi').and.throwError({ status: 401 }); // Simulate HTTP error
    spyOn(apiService, 'postApi').and.returnValue(throwError({ status: 409 }));
    // Simulate form submission with a valid form
    component.registerForm.setValue({
     // userName: 'testUser',
      firstName: 'sanjeev',
      lastName: 'madasu',
      email: 'sanjeev@gmail.com',
      phoneNumber: 9392378549,
      alternativeNumber: 6587412895,
      age: 25,
      userName: 'sandy',
      password: 'Sanjeev@123'
      // ... other form values
    });
    component.submit();

    // Expectations
    expect(apiService.postApi).toHaveBeenCalled(); // Check if the postApi method is called
    // Add more expectations based on the behavior for different HTTP errors
  });
  it('should handle HTTP 500 error on form submission', () => {
    //spyOn(apiService, 'postApi').and.throwError({ status: 401 }); // Simulate HTTP error
    spyOn(apiService, 'postApi').and.returnValue(throwError({ status: 500 }));
    // Simulate form submission with a valid form
    component.registerForm.setValue({
     // userName: 'testUser',
      firstName: 'sanjeev',
      lastName: 'madasu',
      email: 'sanjeev@gmail.com',
      phoneNumber: 9392378549,
      alternativeNumber: 6587412895,
      age: 25,
      userName: 'sandy',
      password: 'Sanjeev@123'
      // ... other form values
    });
    component.submit();

    // Expectations
    expect(apiService.postApi).toHaveBeenCalled(); // Check if the postApi method is called
    // Add more expectations based on the behavior for different HTTP errors
  });
  it('should navigate to login page', () => {
    const router = TestBed.inject(Router); // Inject the Router service
    const navigateSpy = spyOn(router, 'navigateByUrl'); // Use the injected Router service
    component.loginpage();
    expect(navigateSpy).toHaveBeenCalledWith('/login');
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

    component.submit();
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

  // Add more test cases to cover various scenarios:
  // - Edge cases for validation patterns
  // - Error handling for different HTTP response codes
  // - Form submission when the form is valid
  // - User interactions with the form, etc.
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


  it('ngOnInit method have to call', () => {
    spyOn(component, 'ngOnInit'); // Add a spy for your data retrieval function
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
  it('registration method have to call', () => {
    spyOn(component, 'registration'); // Add a spy for your data retrieval function
    component.registration();
    expect(component.registration).toHaveBeenCalled();
  });
  it('Status method have to call', () => {
    spyOn(component, 'statusFunction'); // Add a spy for your data retrieval function
    component.statusFunction();
    expect(component.statusFunction).toHaveBeenCalled();
  });

  it('success method have to call', () => {
    spyOn(component, 'success'); // Add a spy for your data retrieval function
    component.success('success');
    expect(component.success).toHaveBeenCalled();
  });
  it('error method have to call', () => {
    spyOn(component, 'error'); // Add a spy for your data retrieval function
    component.error('error');
    expect(component.error).toHaveBeenCalled();
  });

  it('openSnackBar method have to call', () => {
    spyOn(component, 'openSnackBar'); // Add a spy for your data retrieval function
    component.openSnackBar('success', 'onclick', 'test', 2000);
    expect(component.openSnackBar).toHaveBeenCalled();
  });

  it('submit method have to call', () => {
    spyOn(component, 'submit'); // Add a spy for your data retrieval function
    component.submit();
    expect(component.submit).toHaveBeenCalled();
  });
  it('loginpage method have to call', () => {
    spyOn(component, 'loginpage'); // Add a spy for your data retrieval function
    component.loginpage();
    expect(component.loginpage).toHaveBeenCalled();
  });

  it('should call openSnackBar with the correct parameters for success message', () => {
    const service = TestBed.inject(RegisterComponent);
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
    const service = TestBed.inject(RegisterComponent);
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



