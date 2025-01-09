import { ComponentFixture, TestBed,fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { PiechartComponent } from './piechart.component';
import { ApiService } from 'app/shared/services/api.service'; 
import { of } from 'rxjs'; // Import 'of' from RxJS

describe('PiechartComponent', () => {
  let component: PiechartComponent;
  let fixture: ComponentFixture<PiechartComponent>;
  let apiService: ApiService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [PiechartComponent],
      imports: [HttpClientTestingModule], // Include HttpClientTestingModule
      providers: [ApiService], // Provide your ApiService here
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
it('should render the chart with data', () => {
  component.pieTitle = 'Test Title';
  component.pieSeriesData = [{ name: 'A', y: 10 }, { name: 'B', y: 20 }];
  component.ngOnInit(); // Render the chart
  fixture.detectChanges();
  // Add expectations to check if the chart is correctly rendered.
});
it('should load card data from the API', fakeAsync(() => {
  const testData = [
    { title:'Test Title'},
  { data :[
    { name: 'A', y: 10 }, 
    { name: 'B', y: 20 }
  ]
  
  }
]; 

  // Mock the API service's getApi method to return test data
  spyOn(apiService, 'getApi').and.returnValue(of(testData));

  component.ngOnInit();
  tick(); // Advance the asynchronous code execution

  // Check if the component properties are correctly set from the API response
  expect(component.pieTitle).toEqual('Test Title');
  // expect(component.pieSeriesData).toEqual([
  //   { name: 'A', y: 10 }, 
  //   { name: 'B', y: 20 }
  // ]);

}));  

});
