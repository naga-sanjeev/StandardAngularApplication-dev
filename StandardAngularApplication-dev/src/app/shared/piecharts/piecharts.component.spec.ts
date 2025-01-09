import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartsComponent } from './piecharts.component';

describe('PiechartsComponent', () => {
  let component: PiechartsComponent;
  let fixture: ComponentFixture<PiechartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should set the chart type to pie', () => {
    const chartOptions = component.chartOptions as Highcharts.Options;
    expect(chartOptions.chart.type).toBe('pie');
  });
  
  
  it('should set the data series for the chart', () => {
    component.data = [{ name: 'A', y: 50 }, { name: 'B', y: 50 }];
    fixture.detectChanges(); // Trigger change detection
  
    const chartOptions = component.chartOptions as Highcharts.Options;
    expect(chartOptions.series.length).toBe(1);
    expect(chartOptions.series[0]?.type).toBe('pie');
    // expect(chartOptions.series[0]).toEqual({
    //   type: 'pie',
    //   name: 'Data',
    //   data: [{ name: 'A', y: 50 }, { name: 'B', y: 50 }],
    // });
  });
  
      
});
