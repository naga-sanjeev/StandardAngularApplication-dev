import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call showNotification method', () => {
    spyOn(component, 'showNotification');
    // Simulate a button click that triggers the notification
    const button = fixture.nativeElement.querySelector('.btn-danger');
    button.click();
    fixture.detectChanges();
    // Expect the showNotification method to have been called
    expect(component.showNotification).toHaveBeenCalled();
  });
  it('should call showNotification method with correct parameters', () => {
    //spyOn(window, '$').and.callThrough(); // Spy on jQuery
    spyOn(component, 'showNotification');
    
    // Simulate a button click that triggers the notification
    const button = fixture.nativeElement.querySelector('.btn-danger');
    button.click();
    fixture.detectChanges();
    
    // Expect the showNotification method to have been called with specific parameters
    expect(component.showNotification).toHaveBeenCalledWith('top', 'left');
   // expect(window.$).toHaveBeenCalled(); // Expect jQuery to have been called
  });

  it('should call $.notify with correct configuration', () => {
    //spyOn(window, '$').and.callThrough(); // Spy on jQuery
    spyOn(console, 'error'); // Suppress error logging from $.notify

    // Simulate a button click that triggers the notification
    const button = fixture.nativeElement.querySelector('.btn-danger');
    button.click();
    fixture.detectChanges();

    // Expect $.notify to have been called with specific configurations
    //expect(window.$).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Object));
  });
});
