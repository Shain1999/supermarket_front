import { AbstractControl } from "@angular/forms";

export function validateID(control: AbstractControl) {
    if (control.value.length !=9) {
      return { validID: true };
    }
    return null;
  }