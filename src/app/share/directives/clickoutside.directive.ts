import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective {

  constructor(private el: ElementRef) {
    console.log('ClickOutSideDirective - el - ', this.el.nativeElement);

  }

}
