import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngInput } from "./ang-input.directive";

@NgModule({
  declarations: [AngInput],
  exports: [AngInput],
  imports: [CommonModule],
})
export class AngInputModule {}
