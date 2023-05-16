import { ElementRef, HostBinding, OnInit, Optional, Self } from "@angular/core";
import { Directive, Input } from "@angular/core";
import { convertToBoolProperty } from "../helpers";
import { AbstractControl, FormControl, NgControl } from "@angular/forms";
import { BehaviorSubject, Subject, fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import { AngControl } from "../ang-form-field/ang-form-field.component";

@Directive({
  selector: "[angInput]",
  providers: [{ provide: AbstractControl, useExisting: AngInput }],
  host: {
    "[disabled]": "_disabled",
    "(focus)": "focusChanged(true)",
    "(blur)": "focusChanged(false)",
  },
})
export class AngInput implements OnInit, AngControl {
  @Input()
  @HostBinding("class.show-sucess")
  set showSuccess(value: any) {
    this._showSuccess = convertToBoolProperty(value);
  }
  get showSuccess(): boolean {
    return this._showSuccess;
  }
  protected _showSuccess: boolean = false;

  @Input()
  @HostBinding("class.input-full-width")
  set fullWidth(value: any) {
    this._fullWidth = convertToBoolProperty(value);
  }
  get fullWidth(): boolean {
    return this._fullWidth;
  }
  protected _fullWidth: boolean = false;

  get control(): FormControl {
    return this.ngControl?.control as FormControl;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: any) {
    this._disabled = convertToBoolProperty(value);
    this.disabled$.next(this._disabled);

    if (this.focused) {
      this.focused = false;
    }
  }
  protected _disabled = false;

  @Input() value: any;

  focused: boolean;

  focus$: Subject<boolean> = new Subject();

  isFilled$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  disabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    public elRef: ElementRef<HTMLInputElement>,
  ) {}

  ngOnInit(): void {
    const changeObs = this.control
      ? this.control.valueChanges
      : fromEvent(this.elRef.nativeElement, "input").pipe(map(e => (e.target as any).value));
    const inputValue = this.control ? this.control.value : this.elRef.nativeElement.value;
    changeObs.subscribe(value => {
      this.updateInputFilled(value);
    });
    this.updateInputFilled(inputValue);

    if (this.value !== undefined) {
      this.updateInputFilled(true);
    }
  }

  focusChanged(isFocused: boolean): void {
    if (isFocused !== this.focused) {
      this.focused = isFocused;
      this.focus$.next(isFocused);
    }
  }

  updateInputFilled(value: any): void {
    const isFilled = value.toString().trim() !== "";
    this.isFilled$.next(isFilled);
  }
}
