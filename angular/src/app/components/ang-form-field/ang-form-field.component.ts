import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from "@angular/core";
import { ANG_PREFFIX } from "./directives/preffix.directive";
import { ANG_SUFFIX } from "./directives/suffix.directive";
import { AbstractControl } from "@angular/forms";
import { ANG_HINT } from "./directives/hint.directive";
import { ANG_ERROR } from "./directives/error.directive";
import { convertToBoolProperty } from "../helpers";
import { Subject } from "rxjs";

export interface AngControl {
  control: AbstractControl;
  focus$: Subject<boolean>;
  isFilled$: Subject<boolean>;
}

@Component({
  selector: "ang-form-field",
  templateUrl: "./ang-form-field.component.html",
  styleUrls: ["./ang-form-field.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class.ang-form-field-focused]": "isFocused",
    "[class.ang-form-field-filled]": "isFilled",
    "[class.ang-form-field-has-prefix]": "hasPreffix",
    "[class.ang-form-field-has-suffix]": "hasSuffix",
  },
})
export class AngFormFieldComponent implements OnInit, AfterContentInit {
  @ContentChildren(ANG_PREFFIX, { descendants: true }) preffix: QueryList<any>;
  @ContentChildren(ANG_SUFFIX, { descendants: true }) suffix: QueryList<any>;
  @ContentChildren(ANG_ERROR, { descendants: true }) errors: QueryList<any>;
  @ContentChildren(ANG_HINT, { descendants: true }) hints: QueryList<any>;
  @ContentChild(AbstractControl) formFieldControl: AngControl;

  @Input()
  set showPending(value: any) {
    this._showPending = convertToBoolProperty(value);
  }
  get showSuccess(): boolean {
    return this._showPending;
  }
  _showPending: boolean = false;

  get hasPreffix(): boolean {
    return this.preffix.length > 0;
  }

  get hasSuffix(): boolean {
    return this.suffix.length > 0;
  }

  get control(): AbstractControl {
    return this.formFieldControl?.control;
  }

  isFocused: boolean = false;
  isFilled: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log("isFocused", this.isFocused);
  }

  ngAfterContentInit(): void {
    this.formFieldControl.focus$.subscribe(isFocused => {
      this.updateFocusedState(isFocused);
    });
    this.formFieldControl.isFilled$.subscribe(isFilled => {
      this.updateFilledState(isFilled);
    });
  }

  getDisplayedSubscriptMessages(): "error" | "hint" | "" {
    if (this.showControlErrors()) return "error";
    if (this.showHint()) return "error";
    return "";
  }

  showControlErrors(): boolean {
    return this.control && this.control.invalid && this.control.touched && this.errors.length > 0;
  }

  showHint(): boolean {
    return this.hints.length > 0;
  }

  updateFocusedState(isFocused: boolean): void {
    this.isFocused = isFocused;
  }

  updateFilledState(isFilled: boolean): void {
    this.isFilled = isFilled;
  }

  test() {
    console.log("aaaa");
  }
}
