import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a customOptions object defined', () => {
    expect(component.customOptions).toBeDefined();
  });

  it('should have customOptions with specific properties', () => {
    const customOptions = component.customOptions;

    expect(customOptions.loop).toBe(true);
    expect(customOptions.mouseDrag).toBe(true);
    expect(customOptions.touchDrag).toBe(true);
    expect(customOptions.pullDrag).toBe(false);
    expect(customOptions.dots).toBe(true);
    expect(customOptions.navSpeed).toBe(700);
    expect(customOptions.navText).toEqual(['＜', '＞']);
    
    // You can add more property checks based on your component's behavior.
  });

  it('should have customOptions with a responsive configuration', () => {
    const customOptions = component.customOptions;
    const responsive = customOptions.responsive;

    expect(responsive[0]).toEqual({ items: 1 });
    expect(responsive[400]).toEqual({ items: 1 });
    expect(responsive[740]).toEqual({ items: 1 });
    expect(responsive[940]).toEqual({ items: 1 });
    
    // You can add more checks to verify the responsive configuration.
  });
});
