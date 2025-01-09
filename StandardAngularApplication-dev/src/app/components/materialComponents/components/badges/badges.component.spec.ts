import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgesComponent } from './badges.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from 'app/truncate.pipe';
import { HighlightDirective } from 'app/highlight.directive';
describe('BadgesComponent', () => {
  let component: BadgesComponent;
  let fixture: ComponentFixture<BadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgesComponent,TruncatePipe,HighlightDirective],
      imports: [MatBadgeModule, MatButtonModule, MatCardModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle badge visibility', () => {
    expect(component.hidden).toBeFalsy(); // Badge is initially visible

    component.toggleBadgeVisibility();
    expect(component.hidden).toBeTruthy(); // Badge is hidden after toggling

    component.toggleBadgeVisibility();
    expect(component.hidden).toBeFalsy(); // Badge is visible again after another toggle
  });
});
