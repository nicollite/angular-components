import { HostBinding, OnInit, Optional, Self } from "@angular/core";
import { Directive, Input } from "@angular/core";
import { convertToBoolProperty } from "../helpers";
import { AbstractControl, FormControl, NgControl } from "@angular/forms";
import { Subject } from "rxjs";

@Directive({
  selector: "[angInput]",
  providers: [{ provide: AbstractControl, useExisting: AngInput }],
  host: {
    "(focus)": "focusChanged(true)",
    "(blur)": "focusChanged(false)",
  },
})
export class AngInput implements OnInit {
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

  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  focused: boolean;

  focus$: Subject<boolean> = new Subject();

  isFilled$: Subject<boolean> = new Subject();

  constructor(@Optional() @Self() public ngControl: NgControl) {}

  ngOnInit(): void {
    if (this.control) {
      this.control.valueChanges.subscribe(value => {
        this.updateInputFilled(value);
      });
      this.updateInputFilled(this.control.value);
    }
  }

  /** Callback for the cases where the focused state of the input changes. */
  focusChanged(isFocused: boolean): void {
    if (isFocused !== this.focused) {
      this.focused = isFocused;
      this.focus$.next(isFocused);
    }
  }

  updateInputFilled(value: any): void {
    if (value.toString().trim() !== "") this.isFilled$.next(true);
    else this.isFilled$.next(false);
  }
}
