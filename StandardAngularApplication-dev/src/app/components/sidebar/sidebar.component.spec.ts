

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menuItems', () => {
    // Assuming ROUTES is the source of menu items
    expect(component.menuItems).toBeDefined();
    expect(component.menuItems.length).toBeGreaterThan(0);
  });


  it('isMobileMenu should return false on large screens', () => {
    // Simulate a large screen width
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1000);
    expect(component.isMobileMenu()).toBe(false);
  });

  it('toggleSubmenu should toggle showSubmenu property', () => {
    const menuItem = { showSubmenu: false } as any;
    component.toggleSubmenu(menuItem);
    expect(menuItem.showSubmenu).toBe(true);

    component.toggleSubmenu(menuItem);
    expect(menuItem.showSubmenu).toBe(false);
  });
});

