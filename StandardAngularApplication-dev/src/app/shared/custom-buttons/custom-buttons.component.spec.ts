import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomButtonsComponent } from './custom-buttons.component';
import { Component } from '@angular/core';

describe('CustomButtonsComponent', () => {
  let component: CustomButtonsComponent;
  let fixture: ComponentFixture<CustomButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default button color of "primary"', () => {
    expect(component.buttonColor).toBe('primary');
  });

  it('should have a default button text of "Button Text"', () => {
    expect(component.buttonText).toBe('Button Text');
  });

  it('should set the button text based on input', () => {
    component.buttonText = 'Custom Text';
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toBe('Custom Text');
  });
});

