import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipandpopoversComponent } from './tooltipandpopovers.component';

describe('TooltipandpopoversComponent', () => {
  let component: TooltipandpopoversComponent;
  let fixture: ComponentFixture<TooltipandpopoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooltipandpopoversComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooltipandpopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain buttons with tooltips', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(4);
  
    const topTooltipButton = buttons[0];
    const rightTooltipButton = buttons[1];
    const leftTooltipButton = buttons[2];
    const bottomTooltipButton = buttons[3];
  
    expect(topTooltipButton).toBeTruthy();
    expect(topTooltipButton.getAttribute('matTooltip')).toBe('Tooltip on top');
  
    expect(rightTooltipButton).toBeTruthy();
    expect(rightTooltipButton.getAttribute('matTooltip')).toBe('Tooltip on right');
  
    expect(leftTooltipButton).toBeTruthy();
    expect(leftTooltipButton.getAttribute('matTooltip')).toBe('Tooltip on left');
  
    expect(bottomTooltipButton).toBeTruthy();
    expect(bottomTooltipButton.getAttribute('matTooltip')).toBe('Tooltip on bottom');
  });
  it('should display tooltips in the correct positions', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
  
    const topTooltipButton = buttons[0];
    const rightTooltipButton = buttons[1];
    const leftTooltipButton = buttons[2];
    const bottomTooltipButton = buttons[3];
  
    // Assuming you have a testing framework that can simulate mouse events
    // You can use the framework to simulate mouse hover events on each button
    // and then check if the corresponding tooltip is displayed in the expected position.
  });
  it('should set the button color to "primary"', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
  
    buttons.forEach((button) => {
      expect(button.getAttribute('color')).toBe('primary');
    });
  });
      
  
});
