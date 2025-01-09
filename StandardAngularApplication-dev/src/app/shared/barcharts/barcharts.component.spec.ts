import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Highcharts from 'highcharts';
import { BarchartsComponent } from './barcharts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';


describe('BarchartsComponent', () => {
  let component: BarchartsComponent;
  let fixture: ComponentFixture<BarchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarchartsComponent ],
      //providers: [Highcharts],
      imports:[ReactiveFormsModule,HighchartsChartModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the chartOptions with input values', () => {
    component.title = 'Sample Title';
    component.Categories = ['A', 'B', 'C'];
    component.SeriesData = [10, 20, 30];
  
    component.ngOnInit();
  
    const chartOptions: any = component.chartOptions; // Cast to 'any'
  
    expect(chartOptions.chart.type).toBe('column');
    expect(chartOptions.title.text).toBe('Sample Title');
    expect(chartOptions.xAxis.categories).toEqual(['A', 'B', 'C']);
    expect(chartOptions.series[0].data).toEqual([10, 20, 30]);
  });
  

  it('should render the chart', () => {
    const compiled = fixture.debugElement.nativeElement;
    const highchartsChart = compiled.querySelector('highcharts-chart');
  
    // Update the expectation with a space after "padding-right:"
    expect(highchartsChart.getAttribute('style')).toContain('width: 100%; padding-right: 10px;');
  });
  
  it('should update chart data when inputs change', () => {
    component.title = 'Initial Title';
    component.Categories = ['A', 'B', 'C'];
    component.SeriesData = [10, 20, 30];
  
    component.ngOnInit();
  
    component.title = 'New Title';
    component.Categories = ['X', 'Y', 'Z'];
    component.SeriesData = [5, 15, 25];
  
    component.ngOnInit();
    fixture.detectChanges();
  
    const chartOptions: any = component.chartOptions; // Cast to 'any'
  
    expect(chartOptions.title.text).toBe('New Title');
    expect(chartOptions.xAxis.categories).toEqual(['X', 'Y', 'Z']);
    expect(chartOptions.series[0].data).toEqual([5, 15, 25]);
  });
  
    

});
