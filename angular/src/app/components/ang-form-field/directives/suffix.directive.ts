import { Directive, InjectionToken } from "@angular/core";

export const ANG_SUFFIX = new InjectionToken<AngSuffix>("AngSuffix");

@Directive({
  selector: "[angSuffix]",
  providers: [{ provide: ANG_SUFFIX, useExisting: AngSuffix }],
})
export class AngSuffix {
  constructor() {}
}
