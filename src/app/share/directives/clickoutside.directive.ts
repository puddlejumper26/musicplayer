import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective implements OnChanges {

  // check the type of this.rd.listen
  private handleClick: () => void;

  @Input() bindFlag = false;
  @Output() onClickOutSide = new EventEmitter<void>();

  constructor(private el: ElementRef, private rd: Renderer2, @Inject(DOCUMENT) private doc: Document) {
    // console.log('ClickOutSideDirective - el - ', this.el.nativeElement);

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['bindFlag'] && !changes['bindFlag'].firstChange) {
      if(this.bindFlag) {
        this.handleClick = this.rd.listen(this.doc, 'click', evt => {
          console.log('ClickoutsideDirective - ngOnChanges is called');
          // to tell whether current clicked ele to be contained inside of this el
          const isContain = this.el.nativeElement.contains(evt.target);
          // console.log('ClickOutSideDirective - isContain - ', isContain);
          if(!isContain) {
            this.onClickOutSide.emit();
          }
        });
      }else {
        // unbinding
        this.handleClick();
      }
    }
  }

}
