import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFila]'
})
export class FilaDirective {

  @Input() color: string = 'lightblue';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.cambiarColor(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cambiarColor(null);
  }

  private cambiarColor(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

}
