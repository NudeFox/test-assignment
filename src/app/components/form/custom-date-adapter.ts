import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getParsedDatepickerValue } from '../../shared/utils';

@Injectable()
export class CustomDateAdapter extends NgbDateAdapter<string> {
  fromModel(value: string | null): NgbDateStruct | null {
    return getParsedDatepickerValue(value);
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? `${date.day.toString().padStart(2, '0')}.${date.month.toString().padStart(2, '0')}.${date.year}`
      : null;
  }
}
