import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressbarComponent } from './progressbar.component';

describe('ProgressbarComponent', () => {
  let component: ProgressbarComponent;
  let fixture: ComponentFixture<ProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a progress bar', () => {
    const progressBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(progressBar).toBeTruthy();
  });
});
