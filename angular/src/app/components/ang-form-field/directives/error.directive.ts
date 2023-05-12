import { Directive, InjectionToken } from "@angular/core";

export const ANG_ERROR = new InjectionToken<AngError>("AngError");

@Directive({
  selector: "ang-error,[angError]",
  providers: [{ provide: ANG_ERROR, useExisting: AngError }],
})
export class AngError {
  constructor() {}
}
