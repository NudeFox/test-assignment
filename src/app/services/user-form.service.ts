import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CheckUserResponseData,
  SubmitFormResponseData,
} from '../shared/interface/responses';
import { UserFormDataInterface } from '../shared/interface/user-form-data.interface';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  private readonly http = inject(HttpClient);

  checkUsername(username: string): Observable<CheckUserResponseData> {
    return this.http.post<CheckUserResponseData>('/api/checkUsername', {
      username,
    });
  }

  submitForms(
    formsData: UserFormDataInterface[],
  ): Observable<SubmitFormResponseData> {
    return this.http.post<SubmitFormResponseData>('/api/submitForm', formsData);
  }
}
