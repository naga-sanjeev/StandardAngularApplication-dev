import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select'; 
import { DropdownComponent } from './dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownComponent ],
      imports: [
        MatSelectModule, // Include MatSelectModule
        BrowserAnimationsModule, // Include BrowserAnimationsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the placeholder', () => {
    component.placeholder = 'Select a car';
    fixture.detectChanges();
    const matLabel = fixture.nativeElement.querySelector('.mat-form-field-label');
    expect(matLabel.textContent).toContain('Select a car');
  });
  
  it('should display the selected value', () => {
    component.selectedValue = 'option1';
    fixture.detectChanges();
    const selectedCar = fixture.nativeElement.querySelector('p');
    expect(selectedCar.textContent).toContain('Selected Car: option1');
  });
  
        
});
