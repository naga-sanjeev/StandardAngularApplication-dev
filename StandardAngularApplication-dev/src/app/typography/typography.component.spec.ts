import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyComponent } from './typography.component';

describe('TypographyComponent', () => {
  let component: TypographyComponent;
  let fixture: ComponentFixture<TypographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = fixture.nativeElement.querySelector('.card-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Material Dashboard Heading');
  });
  
  it('should have a subtitle', () => {
    const subtitle = fixture.nativeElement.querySelector('.card-category');
    expect(subtitle).toBeTruthy();
    expect(subtitle.textContent).toContain('Created using Roboto Font Family');
  });
  it('should style text as h1', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    // You can add more expectations on the h1 styling here.
  });
  
  // Add similar tests for h2, h3, h4, h5, and h6.
  
  it('should style the quote', () => {
    const quote = fixture.nativeElement.querySelector('.blockquote');
    expect(quote).toBeTruthy();
    // You can add more expectations on the quote styling here.
  });
  
  it('should style different text types', () => {
    const textTypes = ['text-muted', 'text-primary', 'text-info', 'text-success', 'text-warning', 'text-danger'];
    for (const textType of textTypes) {
      const text = fixture.nativeElement.querySelector('.' + textType);
      expect(text).toBeTruthy();
      // You can add expectations for text styling here.
    }
  });
  
  it('should have a small tag', () => {
    const small = fixture.nativeElement.querySelector('small');
    expect(small).toBeTruthy();
    // Add expectations for the small tag here.
  });
  it('should contain a specific text within a paragraph', () => {
    const paragraph = fixture.nativeElement.querySelector('.tim-typo p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent).toContain("I will be the leader of a company that ends up being worth billions of dollars");
  });
  
  it('should contain a specific author in the quote', () => {
    const author = fixture.nativeElement.querySelector('.blockquote small');
    expect(author).toBeTruthy();
    expect(author.textContent).toContain("Kanye West, Musician");
  });
      

});
