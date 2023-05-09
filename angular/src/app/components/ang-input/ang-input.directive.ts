import { HostBinding, OnInit } from "@angular/core";
import { Directive, ElementRef, Input } from "@angular/core";
import { convertToBoolProperty } from "../helpers";

@Directive({
  selector: "[angInput]",
})
export class AngInputDirective implements OnInit {
  @Input()
  @HostBinding("class.show-sucess")
  set showSuccess(value: any) {
    this._showSuccess = convertToBoolProperty(value);
  }
  get showSuccess(): boolean {
    return this._showSuccess;
  }
  private _showSuccess: boolean = false;

  @Input()
  @HostBinding("class.input-full-width")
  set fullWidth(value: any) {
    this._fullWidth = convertToBoolProperty(value);
  }
  get fullWidth(): boolean {
    return this._fullWidth;
  }
  private _fullWidth: boolean = false;

  constructor(private elRef: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {}
}
