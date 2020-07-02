import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {
  @HostBinding("isCollapsed") isOpen = false;
  @HostListener("document:click", ["$event"]) toggleOpen(event: Event) {
    console.log("clicked");
    console.log(event);
    
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  constructor(private elRef: ElementRef) {}
}
