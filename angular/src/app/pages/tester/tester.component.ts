import { Component, OnInit } from "@angular/core";
import { FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Component({
  templateUrl: "./tester.component.html",
  styleUrls: ["./tester.component.scss"],
})
export class TesterComponent implements OnInit {
  control1: FormControl = new FormControl("");
  control2: FormControl = new FormControl("");

  constructor() {}

  ngOnInit(): void {
    this.control1.setValidators(this.testValidators() as any);
  }

  testValidators() {
    return (control: FormControl) => {
      if (control.value === "") return { error: "a" };
      if (control.value === "a") return { error: "no value" };
      return null;
    };
  }
}
