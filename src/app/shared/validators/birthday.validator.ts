import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function birthdayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Regular expression to match the 'dd.mm.yyyy' format
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!dateRegex.test(value)) {
      return { invalidDateFormat: true };
    }

    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day);

    // Check if date is valid and not in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day
    if (date > today) {
      return { futureDate: true };
    }

    return null;
  };
}
