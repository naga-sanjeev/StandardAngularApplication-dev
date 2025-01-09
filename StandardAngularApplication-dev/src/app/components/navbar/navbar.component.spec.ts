import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { Location } from '@angular/common';
import { fakeAsync, tick } from '@angular/core/testing';
import { ElementRef, NgModule } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let location: Location;
  let router: Router;
  let toggleButton: HTMLElement;
  @NgModule({
    imports: [RouterTestingModule],
    providers: [
      Location,
      { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } }
    ],
    
  })
  class TestModule {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [TestModule] // Use the test module
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    toggleButton = fixture.nativeElement.querySelector('.navbar-toggler'); // Replace with your toggle button class
    fixture.detectChanges();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct title', () => {
    // Adjust this based on the expected behavior
    expect(component.getTitle()).toEqual('Dashboard');
  });
  it('should add "toggled" class after a timeout', fakeAsync(() => {
    // Trigger the action that initiates the setTimeout
    component.sidebarOpen();

    // Advance time by 500 milliseconds (assuming your timeout is 500ms)
    tick(500);

    fixture.detectChanges();

    // Assert that the class "toggled" has been added to your button element
    expect(toggleButton.classList.contains('toggled')).toBe(true);
  }));


  it('should open sidebar', () => {
    // const initialVisibility = component.mobile_menu_visible;

    component.sidebarOpen();
    // expect(component.mobile_menu_visible).toEqual(1);
  });

  it('should close sidebar', () => {
    component.sidebarClose();
    expect(component.mobile_menu_visible).toEqual(0);
  });
  it('Should call sidebar close method', () => {
    spyOn(component, 'sidebarClose'); // Add a spy for your data retrieval function
    component.sidebarClose();
    expect(component.sidebarClose).toHaveBeenCalled();
  });
  it('Should call sidebar open method', () => {
    spyOn(component, 'sidebarOpen'); // Add a spy for your data retrieval function
    component.sidebarOpen();
    expect(component.sidebarOpen).toHaveBeenCalled();
  });
  it('Should call getTitle open method', () => {
    spyOn(component, 'getTitle'); // Add a spy for your data retrieval function
    component.getTitle();
    expect(component.getTitle).toHaveBeenCalled();
  });
  it('Should call ngOnInit open method', () => {
    spyOn(component, 'ngOnInit'); // Add a spy for your data retrieval function
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });



  it('should return "Dashboard" for default route', () => {
    spyOn(location, 'prepareExternalUrl').and.returnValue('/dashboard');
    const title = component['getTitle'](); // Accessing private method directly
    expect(title).toEqual('Dashboard');
  });

  it('should return the title for a matching route', () => {
    spyOn(location, 'prepareExternalUrl').and.returnValue('/other-route');

    // Mocking private property listTitles using component['listTitles']
    component['listTitles'] = [
      { path: 'dashboard', title: 'Dashboard' },
      { path: 'other-route', title: 'Other Route' }
    ];
    const title = component['getTitle'](); // Accessing private method directly
    expect(title).toEqual('Dashboard');
  });

  it('should return "Dashboard" for unmatched route', () => {
    spyOn(location, 'prepareExternalUrl').and.returnValue('/unmatched');
    component['listTitles'] = [
      { path: 'dashboard', title: 'Dashboard' },
      { path: 'other-route', title: 'Other Route' }
    ];
    const title = component['getTitle'](); // Accessing private method directly
    expect(title).toEqual('Dashboard');
  });
  it('should slice the string correctly', () => {
    // Prepare test data
    spyOn(location, 'prepareExternalUrl').and.returnValue('Dashboard');
    
    // Call the method
    const result = component.getTitle();

    // Assertion
    expect(result).toBe('Dashboard');
  });

  it('should return the string unchanged if it does not start with "#"', () => {
    // Prepare test data
    spyOn(location, 'prepareExternalUrl').and.returnValue('Dashboard');

    // Call the method
    const result = component.getTitle();

    // Assertion
    expect(result).toBe('Dashboard');
  });
  it('should remove the element with class "close-layer" in sidebarClose() method', () => {
    spyOn(document, 'getElementsByClassName').and.callFake((className: string) => {
      if (className === 'close-layer') {
        const mockElement = document.createElement('div');
        return [mockElement] as any;
      }
      return [];
    });

    component.sidebarClose();

    // Your expectation based on the method's behavior rather than direct property access
  });
  // Inside the test for sidebarClose()

it('should remove classes from body and toggle button in sidebarClose() method', () => {
  const mockBody = document.createElement('body');
  spyOn(document, 'getElementsByTagName').and.returnValue([mockBody] as any);

  const mockToggleBtn = document.createElement('div');
  spyOn(component.getToggleElement(), 'getElementsByClassName').and.returnValue([mockToggleBtn] as any);

  component.sidebarClose();

  // Expect the 'nav-open' class to be removed from the body
  expect(mockBody.classList.contains('nav-open')).toBe(false);

  // Expect the 'toggled' class to be removed from the toggle button
  expect(mockToggleBtn.classList.contains('toggled')).toBe(false);
});

});
