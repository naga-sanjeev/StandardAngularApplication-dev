import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'app/shared/services/api.service';
import { TabsComponent } from './tabs.component';
import { environment } from 'environments/environment';
describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsComponent ],
      imports: [HttpClientModule], // Add this line
      providers: [ApiService] // Add this line
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tabsData with empty array', () => {
    expect(component.tabsData).toEqual([]);
  });
  it('should call the API service with the correct endpoint', () => {
    const apiService = TestBed.inject(ApiService);
    const expectedEndpoint = environment.tabData;
  
    spyOn(apiService, 'getApi').and.callThrough();
  
    component.ngOnInit();
  
    expect(apiService.getApi).toHaveBeenCalledWith(expectedEndpoint);
  });
    

});
