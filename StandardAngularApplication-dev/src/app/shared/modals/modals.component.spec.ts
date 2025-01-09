import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalsComponent } from './modals.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ModalsComponent', () => {
  let component: ModalsComponent;
  let fixture: ComponentFixture<ModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalsComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display modal title', () => {
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('Dialog with elements');
  });

  it('should display modal content', () => {
    const contentElement = fixture.nativeElement.querySelector('mat-dialog-content');
    expect(contentElement.textContent).toContain(
      'This dialog showcases the title, close, content and actions elements'
    );
  });

 
});
