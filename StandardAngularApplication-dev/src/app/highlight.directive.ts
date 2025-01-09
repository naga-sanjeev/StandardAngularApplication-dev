//import { Directive } from '@angular/core';
import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  //constructor() { }
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input('appHighlight') newColor: string; // Input property to set the new color

  @HostListener('mouseenter') onMouseEnter() {
    this.changeColor(this.newColor || 'yellow'); // Default color is yellow
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor(null); // Reset the color on mouse leave
  }

  private changeColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

}
