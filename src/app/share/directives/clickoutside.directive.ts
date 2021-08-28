import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective {

  // check the type of this.rd.listen
  private handleClick: () => void;

  constructor(private el: ElementRef, private rd: Renderer2, @Inject(DOCUMENT) private doc: Document) {
    console.log('ClickOutSideDirective - el - ', this.el.nativeElement);
    this.handleClick = this.rd.listen(this.doc, 'click', evt => {
      // to tell whether current clicked ele to be contained inside of this el
      const isContain = this.el.nativeElement.contains(evt.target);
      console.log('ClickOutSideDirective - isContain - ', isContain);

    });
  }

}
