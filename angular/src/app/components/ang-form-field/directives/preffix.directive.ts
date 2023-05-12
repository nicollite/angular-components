import { Directive, InjectionToken } from "@angular/core";

export const ANG_PREFFIX = new InjectionToken<AngPreffix>("AngPreffix");

@Directive({
  selector: "[angPreffix]",
  providers: [{ provide: ANG_PREFFIX, useExisting: AngPreffix }],
})
export class AngPreffix {
  constructor() {}
}
