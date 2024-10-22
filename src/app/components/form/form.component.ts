import { Component, Input } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbInputDatepicker,
  NgbTypeahead,
} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter } from './custom-date-adapter';
import { CustomDateParserFormatter } from './custom-dateparser-formatter';
import { Country } from '../../shared/enum/country';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
} from 'rxjs';
import { InputValidationDirective } from '../../shared/directives/input-validation.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgbInputDatepicker,
    NgbTypeahead,
    InputValidationDirective,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [
    { provide: NgbDateAdapter, useClass: CustomDateAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class FormComponent {
  @Input({ required: true }) form!: FormGroup;

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  currentDay = new Date().getDate();

  countries = Object.values(Country);

  searchCountry: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>,
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.countries
              .filter((v) => v.toLowerCase().includes(term.toLowerCase()))
              .slice(0, 10),
      ),
    );
}
