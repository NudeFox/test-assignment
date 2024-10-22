import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { UserFormService } from '../../services/user-form.service';

export function usernameValidator(
  formsService: UserFormService,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return of(control.value).pipe(
      debounceTime(600),
      distinctUntilChanged(),
      filter((value) => value.length > 0),
      switchMap((value) =>
        formsService.checkUsername(value).pipe(
          map((res) => (res.isAvailable ? null : { usernameTaken: true })),
          catchError(() => of(null)),
        ),
      ),
    );
  };
}
