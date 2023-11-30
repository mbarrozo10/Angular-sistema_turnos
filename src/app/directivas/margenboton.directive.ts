import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMargenboton]'
})
export class MargenbotonDirective {
  @Input() color: string = 'red';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.aplicarEstilos();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.revertirEstilos();
  }

  private aplicarEstilos() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.color);
  }

  private revertirEstilos() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', "#1161ee");
  }
}
