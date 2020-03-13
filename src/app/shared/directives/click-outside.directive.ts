import { Directive, ElementRef, Output, OnInit, OnDestroy, EventEmitter, Input } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective  implements OnInit, OnDestroy  {

  hasIcon: boolean;
  index: number;
  private listening: boolean;
  private globalClick;
  @Output('clickOutside') clickOutside: EventEmitter<Object>;

  constructor(
    private _elRef: ElementRef
  ) {
    this.listening = false;
    this.clickOutside = new EventEmitter();
  }

  ngOnInit() {
    this.globalClick =
      fromEvent(document, 'click').pipe(
        delay(1),
        tap(event => {
            this.listening = true;
            this.onGlobalClick(event);
        })
      ).subscribe();
  }

  ngOnDestroy() {
    this.globalClick.unsubscribe();
  }

  onGlobalClick(event) {
    const elWidget = document.getElementsByClassName('click-widget');
    this.hasIcon = false;
    if (event instanceof MouseEvent && this.listening && !this.isDescendant(this._elRef.nativeElement, event.target)) {
      for (var l = 0; l < elWidget.length ; l++){
        if (this.isDescendant(elWidget[l], event.target)) {
          this.hasIcon = true;
        }
      }
      if (!this.hasIcon){
        this.clickOutside.emit({
          value: true,
          target: event.target
        });
      } else {
        this.clickOutside.emit({
          value: false,
          target: event.target
        });
      }
    }
  }

  isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }

}
