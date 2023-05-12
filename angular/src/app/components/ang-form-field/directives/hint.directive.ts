import { Directive, InjectionToken } from "@angular/core";

export const ANG_HINT = new InjectionToken<AngHint>("AngHint");

@Directive({
  selector: "[angHint]",
  providers: [{ provide: ANG_HINT, useExisting: AngHint }],
})
export class AngHint {
  constructor() {}
}
