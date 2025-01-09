import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionsComponent } from './accordions.component';

describe('AccordionsComponent', () => {
  let component: AccordionsComponent;
  let fixture: ComponentFixture<AccordionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccordionsComponent],
      imports: [ReactiveFormsModule], // Include ReactiveFormsModule in the imports array
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial step to 0', () => {
    expect(component.step).toBe(0);
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
});

