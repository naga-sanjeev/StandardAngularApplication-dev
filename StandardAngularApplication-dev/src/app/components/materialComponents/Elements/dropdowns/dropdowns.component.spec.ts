
import { ComponentFixture, TestBed ,fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { DropdownsComponent } from './dropdowns.component';
import { ApiService } from 'app/shared/services/api.service'; 
import { of } from 'rxjs'; // Import 'of' from RxJS
describe('DropdownsComponent', () => {
  let component: DropdownsComponent;
  let fixture: ComponentFixture<DropdownsComponent>;
  let apiService: ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownsComponent],
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule here
      providers: [ApiService], // Provide your ApiService here
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should set the selected option', () => {
    const expectedSelectedOption = { label: 'Option 2', value: 2 };
    component.selectedOption = expectedSelectedOption;
    fixture.detectChanges(); // Trigger change detection
    expect(component.selectedOption).toEqual(expectedSelectedOption);
  });
  it('should set the placeholder', () => {
    const expectedPlaceholder = 'Select an option';
    component.dropdownPlaceholder = expectedPlaceholder;
    fixture.detectChanges(); // Trigger change detection
    expect(component.dropdownPlaceholder).toBe(expectedPlaceholder);
  });
  it('ngOnInit have to', () => {
    spyOn(component, 'ngOnInit'); // Add a spy for your data retrieval function
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
  it('should load card data from the API', fakeAsync(() => {
    const testData = [
      {dropdownPlaceholder: 'Select a option'},
    { dropdownOptions :[{ label: 'Volvo', value: 'Volvo' },
    { label: 'Mercedes', value: 'Mercedes' },
    { label: 'BMW', value: 'BMW' },
    { label: 'Skoda', value: 'Skoda'},]
    
    }
  ]; 
    // Mock the API service's getApi method to return test data
    spyOn(apiService, 'getApi').and.returnValue(of(testData));

    component.ngOnInit();
    tick(); // Advance the asynchronous code execution

    // Check if the component properties are correctly set from the API response
    expect(component.dropdownPlaceholder).toEqual('Select a option');
    //expect(component.dropdownOptions).toEqual();
  
  }));   
  
});

