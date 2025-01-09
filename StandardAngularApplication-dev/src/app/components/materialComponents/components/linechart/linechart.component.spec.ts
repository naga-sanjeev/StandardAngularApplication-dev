import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartComponent } from './linechart.component';

describe('LinechartComponent', () => {
  let component: LinechartComponent;
  let fixture: ComponentFixture<LinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have initial series data', () => {
    expect(component.seriesData).toBeDefined();
  });
  
  it('should have initial categories', () => {
    expect(component.categories).toBeDefined();
  });
  it('should render the chart', () => {
    const chartElement = fixture.nativeElement.querySelector('#container');
    expect(chartElement).toBeDefined();
  });
  
  
});
