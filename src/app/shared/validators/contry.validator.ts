import { Country } from '../enum/country';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function countryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const country = control.value;
    if (!country) {
      return null;
    }

    const countries = Object.values(Country);

    return countries.includes(country) ? null : { invalidCountry: true };
  };
}
