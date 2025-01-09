import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CardsComponent } from './cards.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'app/shared/services/api.service';
import { of } from 'rxjs'; // Import 'of' from RxJS

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsComponent],
      imports: [HttpClientModule],
      providers: [ApiService], // Provide ApiService
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); // Inject the ApiService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load card data from the API', fakeAsync(() => {
    const testData = [
      { title: 'Test Title', subtitle: 'Test Subtitle', content: 'Test Content' }
    ];

    // Mock the API service's getApi method to return test data
    spyOn(apiService, 'getApi').and.returnValue(of(testData));

    component.ngOnInit();
    tick(); // Advance the asynchronous code execution

    // Check if the component properties are correctly set from the API response
    expect(component.cardTitle).toEqual('Test Title');
    expect(component.cardSubtitle).toEqual('Test Subtitle');
    expect(component.cardContent).toEqual('Test Content');
  }));
});

