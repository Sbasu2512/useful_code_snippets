//directive to resize width of a splitter pane in Angular
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
@Directive({
  selector: '[appWidthResizable]'
})
export class WidthResizableDirective implements OnInit {
  @Input() resizableGrabWidth = 5;
  @Input() set width(width: Number) {
    this._width = width.valueOf();
    this.newWidth(this._width);
  }
  @Output() private widthResize = new EventEmitter<number>();
  get width(): number {
    return this._width;
  }
  private _width = WidthResizableDirective.MINIMUM_WIDTH;
  private dragging = false;
  private static readonly MINIMUM_WIDTH: number =
    document?.documentElement?.clientWidth / 25;
  constructor(private el: ElementRef) {}
  @HostListener('document:mousemove', ['$event'])
  mouseMoveG(evt: MouseEvent): void {
    if (!this.dragging) {
      return;
    }
    this.newWidth(
      this.el.nativeElement.offsetLeft -
        evt.clientX +
        this.el.nativeElement.clientWidth
    );
    this.pauseEvent(evt);
  }
  @HostListener('document:mouseup', ['$event'])
  mouseUpG(evt: MouseEvent): void {
    if (!this.dragging) {
      return;
    }
    this.restoreGlobalMouseEvents();
    this.dragging = false;
    evt.stopPropagation();
  }
  @HostListener('mousedown', ['$event'])
  mouseDown(evt: MouseEvent): void {
    if (this.inDragRegion(evt)) {
      this.dragging = true;
      if (evt.movementX === 0 && evt.movementY === 0) {
        return;
      }
      this.preventGlobalMouseEvents();
      evt.stopPropagation();
    } else {
      if (evt.movementX === 0 && evt.movementY === 0) {
        return;
      }
    }
  }
  @HostListener('mousemove', ['$event'])
  mouseMove(evt: MouseEvent): void {
    if (this.inDragRegion(evt) || this.dragging) {
      this.el.nativeElement.style.cursor = 'col-resize';
    } else {
      this.el.nativeElement.style.cursor = 'default';
    }
    if (evt.movementX === 0 && evt.movementY === 0) {
      return;
    }
  }
  @HostListener('dbclick', ['$event'])
  onDoubleClick(evt: MouseEvent): void {
    this.newWidth(WidthResizableDirective.MINIMUM_WIDTH);
    evt.stopPropagation();
  }
  ngOnInit(): void {
    this.el.nativeElement.style['border-left'] =
      this.resizableGrabWidth + 'px solid darkgrey';
  }
  private inDragRegion(evt: MouseEvent): boolean {
    return (
      this.el.nativeElement.offsetLeft <= evt.clientX &&
      this.el.nativeElement.offsetLeft + this.resizableGrabWidth >= evt.clientX
    );
  }
  private preventGlobalMouseEvents(): void {
    document.body.style.pointerEvents = 'none';
  }
  private restoreGlobalMouseEvents() {
    document.body.style.pointerEvents = 'auto';
  }
  private newWidth(wid: number): void {
    if (WidthResizableDirective.MINIMUM_WIDTH < wid) {
      this.el.nativeElement.style.width = wid + 'px';
    } else {
      this.el.nativeElement.style.width =
        WidthResizableDirective.MINIMUM_WIDTH + 'px';
    }
    this.widthResize.emit(wid - WidthResizableDirective.MINIMUM_WIDTH);
  }
  private pauseEvent(e: MouseEvent): void {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
  }
}
