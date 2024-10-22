import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { getParsedDatepickerValue } from '../../shared/utils';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    // For simplicity i leave it like this, and it will handle only . as delimeter
    // but in the real world this dateparser shouldn't use the same logic as date adapter
    // and instead handle different date formats and delimeters for e.x. 01-01-2021, 2021/01/01, 15.01.2021 and so on.
    // In perfect world user shouldn't type the date at all, but instead use datepicker
    return getParsedDatepickerValue(value);
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? `${date.day.toString().padStart(2, '0')}.${date.month.toString().padStart(2, '0')}.${date.year}`
      : '';
  }
}
