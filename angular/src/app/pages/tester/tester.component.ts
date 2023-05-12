import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NEVER } from "rxjs";

@Component({
  templateUrl: "./tester.component.html",
  styleUrls: ["./tester.component.scss"],
})
export class TesterComponent implements OnInit {
  controls: FormControl[] = [];

  constructor() {}

  ngOnInit(): void {
    this.controls = Array(6)
      .fill(null)
      .map(_ => new FormControl(""));

    this.controls[0].setValidators(this.testValidators() as any);
    this.controls[1].setValidators(this.testValidators() as any);
    this.controls[2].setValidators(this.testValidators() as any);
    this.controls[3].setAsyncValidators(() => NEVER);
    this.controls[5].setValidators(this.testValidators() as any);
  }

  testValidators() {
    return (control: FormControl) => {
      if (control.value === "a") return { aValueError: "a" };
      if (control.value === "") return { noValue: "no value" };
      return null;
    };
  }

  getErrorMessage(index: number): string {
    if (this.controls[index].hasError("aValueError")) return 'Has the string "a"';
    if (this.controls[index].hasError("noValue")) return "Input is empty";
    return "";
  }
}
