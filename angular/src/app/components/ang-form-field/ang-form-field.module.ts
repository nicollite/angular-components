import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngFormFieldComponent } from "./ang-form-field.component";
import { AngError } from "./directives/error.directive";
import { AngSuffix } from "./directives/suffix.directive";
import { AngPreffix } from "./directives/preffix.directive";
import { AngHint } from "./directives/hint.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [AngFormFieldComponent, AngError, AngSuffix, AngPreffix, AngHint],
  exports: [AngFormFieldComponent, AngError, AngSuffix, AngPreffix],
})
export class AngFormFieldModule {}
