import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandardButtonsComponent } from './standard-buttons.component';

describe('StandardButtonsComponent', () => {
  let component: StandardButtonsComponent;
  let fixture: ComponentFixture<StandardButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StandardButtonsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StandardButtonsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain links with correct attributes', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(1); // There should be one link
    const link = links[0];
    expect(link.getAttribute('href')).toBe('https://www.google.com/');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  
  it('should have disabled button', () => {
    const disabledButton = fixture.nativeElement.querySelector('button[disabled]');
    expect(disabledButton).toBeTruthy();
  });
});
