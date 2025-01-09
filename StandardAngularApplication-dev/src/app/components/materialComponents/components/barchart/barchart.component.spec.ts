import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BarchartComponent } from './barchart.component';
import { of } from 'rxjs'; // Import of for creating mock observables
import { ApiService } from 'app/shared/services/api.service';
describe('BarchartComponent', () => {
  let component: BarchartComponent;
  let fixture: ComponentFixture<BarchartComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [BarchartComponent],
      imports: [HttpClientModule], // Add HttpClientModule to imports
    }).compileComponents();

    fixture = TestBed.createComponent(BarchartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data and populate chartOptions', fakeAsync(() => {
    const apiResponse = [
      {
        title: 'Chart Title',
        categories: ['Category 1', 'Category 2'],
        datas: [10, 20],
      },
    ];

    // Create a mock ApiService
    const apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'getApi').and.returnValue(of(apiResponse));

    component.ngOnInit();
    tick(); // Wait for the observable to complete

    expect(component.barTitle).toBe('Chart Title');
    expect(component.barCategories).toEqual(['Category 1', 'Category 2']);
    expect(component.barSeriesData).toEqual([10, 20]);
    expect(component.chartOptions).toEqual({
      chart: {
        type: 'column',
      },
      title: {
        text: 'Chart Title',
      },
      xAxis: {
        categories: ['Category 1', 'Category 2'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Assists',
        },
      },
      tooltip: {
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true,
      },
      plotOptions: {
        column: {
          stacking: 'percent',
        },
      },
      series: [
        {
          type: 'bar',
          name: 'Data',
          data: [10, 20],
        },
      ],
    });
  }));
});

