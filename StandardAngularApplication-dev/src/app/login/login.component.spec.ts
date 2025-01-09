import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar service
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiService: ApiService;
  let router: Router; 
   let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MatSnackBar', [ 'success','postApi']);
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MatSnackBarModule, BrowserAnimationsModule, ReactiveFormsModule, HttpClientTestingModule,RouterTestingModule],
      providers: [FormBuilder, ApiService, MatSnackBar], // Include MatSnackBar in providers
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inject Router
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router); // Inject the Router service
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    //spyOn(apiService, 'postApi').and.returnValue(of(/* Mock a successful response */));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call when post api is hit',()=>{

    const mockResponseBody={
      "userName": component.loginForm.controls.userName.value,
      "password": component.loginForm.controls.password.value,
    }

    component.loginForm.patchValue({
      "userName":"Test",
        "password": "Test@521",
    })
    spyOn(apiService, 'postApi').and.returnValue(of(mockResponseBody));
    spyOn(router, 'navigateByUrl').and.stub();
    component.logIn()
    expect(apiService.postApi).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
    expect(component.message).toEqual('LogIn Successfully');
    expect(component.toastColor).toEqual('success_SnackBar');
  });
 
  // Add more test cases as needed.
  it('should handle invalid form submission', () => {
    // Set form controls to invalid values
    component.loginForm.get('userName').setValue(''); // Empty value to simulate required field
    component.loginForm.get('password').setValue(''); // Empty value to simulate required field
  
    component.logIn(); // Trigger the login function
  
    // Check if form errors are displayed after an invalid submission
    expect(component.loginForm.get('userName').errors.required).toBeTruthy();
    expect(component.loginForm.get('password').errors.required).toBeTruthy();
    // Add more specific error checks if available
    // ...
  
    // Optionally, check if the error snackbar is displayed
    //(/* check the error snackbar state */).toBeTruthy();
  });
  it('should handle 401 Unauthorized error', () => {
    spyOn(apiService, 'postApi').and.returnValue(throwError({ status: 401 })); // Simulate 401 Unauthorized error
  
    // Set valid form values
    component.loginForm.get('userName').setValue('validUsername');
    component.loginForm.get('password').setValue('validPassword');
  
    component.logIn(); // Trigger the login function
  
    expect(component.message).toBe('invalid inputs');
    expect(component.toastColor).toBe('error_SnackBar');
    // Check if the error message is displayed correctly for unauthorized access
  });
  
  it('should handle 409 Conflict error', () => {
    spyOn(apiService, 'postApi').and.returnValue(throwError({ status: 409 })); // Simulate 409 Conflict error
  
    // Set valid form values
    component.loginForm.get('userName').setValue('validUsername');
    component.loginForm.get('password').setValue('validPassword');
  
    component.logIn(); // Trigger the login function
  
    expect(component.message).toBe('invalid inputs');
    expect(component.toastColor).toBe('error_SnackBar');
    // Check if the error message is displayed correctly for conflict errors
  });
  
  it('should handle unexpected server errors', () => {
    spyOn(apiService, 'postApi').and.returnValue(throwError({ status: 500 })); // Simulate unexpected server error
  
    // Set valid form values
    component.loginForm.get('userName').setValue('validUsername');
    component.loginForm.get('password').setValue('validPassword');
  
    component.logIn(); // Trigger the login function
  
    expect(component.message).toBe('An error occurred. Please try again later.');
    expect(component.toastColor).toBe('error_SnackBar');
    // Check if the error message is displayed correctly for unexpected server errors
  });
  
  it('should mark form controls as touched if form is invalid', () => {
    const controls = component.loginForm.controls;
    spyOn(apiService, 'postApi').and.returnValue(of(/* Mock a successful login response */));
  
    // Trigger login with empty form fields
    component.logIn();
  
    Object.keys(controls).forEach((key) => {
      expect(controls[key].touched).toBeTrue();
    });
  });
  it('should navigate to register page on signUp()', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl'); // Spy on navigateByUrl method

    component.signUp(); // Call the signUp method

    const expectedUrl = '/register';
    expect(navigateSpy).toHaveBeenCalledWith(expectedUrl); // Expect navigateByUrl to be called with the expected URL
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
  
  it('should not set message or call success function when status is false', () => {
    // Arrange
    component.status = false;
    spyOn(component, 'success');
  
    // Act
    component.statusFunction();
  
    // Assert
    expect(component.message).toBeUndefined(); // Or expect(component.message).toBeFalsy();
    expect(component.success).not.toHaveBeenCalled();
  });
  
});

