import {AbstractControl, ValidationErrors} from "@angular/forms";

export default class Validation {
  static notBlank(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (Array.isArray(value)) {
      return value.length > 0 ? null : {required: true};
    }
    if (typeof value === 'string') {
      return value.trim().length > 0 ? null : {required: true};
    }
    return value !== null && value !== undefined ? null : {required: true};
  }
}
