import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngInputDirective } from "./ang-input.directive";

@NgModule({
  declarations: [AngInputDirective],
  exports: [AngInputDirective],
  imports: [CommonModule],
})
export class AngInputModule {}
