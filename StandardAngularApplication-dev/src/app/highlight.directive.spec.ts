// import { HighlightDirective } from './highlight.directive';

// describe('HighlightDirective', () => {
//   it('should create an instance', () => {
//     const directive = new HighlightDirective();
//     expect(directive).toBeTruthy();
//   });
// });
import { HighlightDirective } from './highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const elMock: ElementRef = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const rendererMock: Renderer2 = jasmine.createSpyObj('Renderer2', ['setStyle']);

    const directive = new HighlightDirective(elMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});

