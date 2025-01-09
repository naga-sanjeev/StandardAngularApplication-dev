// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { FooterComponent } from './footer.component';

// describe('FooterComponent', () => {
//   let component: FooterComponent;
//   let fixture: ComponentFixture<FooterComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ FooterComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FooterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the footer content correctly', () => {
    // Get the footer element from the DOM
    const footerElement: HTMLElement = fixture.nativeElement;

    // Assert that the footer contains certain text or elements
    expect(footerElement.textContent).toContain('Miracle');
    expect(footerElement.textContent).toContain('About Us');
    expect(footerElement.textContent).toContain('Blog');
    expect(footerElement.textContent).toContain('Licenses');
    expect(footerElement.textContent).toContain('©');
    expect(footerElement.textContent).toContain('Miracle');
  });

  // You can add more test cases as needed to verify other aspects of your component.
});

