import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms'; // Import FormBuilder
import { SteppersComponent } from './steppers.component';

describe('SteppersComponent', () => {
  let component: SteppersComponent;
  let fixture: ComponentFixture<SteppersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteppersComponent ],
      providers: [FormBuilder], // Provide FormBuilder
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteppersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should increment the step on nextStep()', () => {
    component.nextStep();
    expect(component.step).toBe(1);
  });
  
  it('should decrement the step on prevStep()', () => {
    component.step = 2; // Set the step to simulate being on the last step.
    component.prevStep();
    expect(component.step).toBe(1);
  });
  it('should set the step using setStep()', () => {
    component.setStep(2);
    expect(component.step).toBe(2);
  });
  it('should initialize form groups', () => {
    expect(component.firstFormGroup).toBeTruthy();
    expect(component.secondFormGroup).toBeTruthy();
  });
  
  it('should set isLinear to false', () => {
    expect(component.isLinear).toBe(false);
  });
  
  it('should increment the step on nextStep()', () => {
    component.nextStep();
    expect(component.step).toBe(1);
  });
  
  it('should decrement the step on prevStep()', () => {
    component.step = 2; // Set the step to simulate being on the last step.
    component.prevStep();
    expect(component.step).toBe(1);
  });
  
  it('should set the step using setStep()', () => {
    component.setStep(2);
    expect(component.step).toBe(2);
  });
  
  // Additional tests for form controls, stepper actions, etc.
      
});
