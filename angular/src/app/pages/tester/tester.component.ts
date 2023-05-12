import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NEVER } from "rxjs";

@Component({
  templateUrl: "./tester.component.html",
  styleUrls: ["./tester.component.scss"],
})
export class TesterComponent implements OnInit {
  control1: FormControl = new FormControl("");
  control2: FormControl = new FormControl("");
  control3: FormControl = new FormControl("");
  control4: FormControl = new FormControl("");
  control5: FormControl = new FormControl("");

  constructor() {}

  ngOnInit(): void {
    this.control1.setValidators(this.testValidators() as any);
    this.control2.setValidators(this.testValidators() as any);
    this.control3.setValidators(this.testValidators() as any);
    this.control4.setAsyncValidators(() => NEVER);
  }

  testValidators() {
    return (control: FormControl) => {
      if (control.value === "a") return { aValueError: "a" };
      if (control.value === "") return { noValue: "no value" };
      return null;
    };
  }

  getErrorMessage(): string {
    if (this.control3.hasError("aValueError")) return 'Has the string "a"';
    if (this.control3.hasError("noValue")) return "Input is empty";

    return "";
  }
}
