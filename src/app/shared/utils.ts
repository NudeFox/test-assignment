import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export function getParsedDatepickerValue(
  value: string | null,
): NgbDateStruct | null {
  if (!value) {
    return null;
  }

  const [dayStr, monthStr, yearStr] = value.split('.');

  if (!dayStr || !monthStr || !yearStr) {
    // If any of the parts are missing, return null
    return null;
  }
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  return { day, month, year };
}
