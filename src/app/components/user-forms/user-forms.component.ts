import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFormService } from '../../services/user-form.service';
import { FormComponent } from '../form/form.component';
import { NgForOf, NgIf } from '@angular/common';
import { usernameValidator } from '../../shared/validators/user-name.validator';
import { countryValidator } from '../../shared/validators/contry.validator';
import { birthdayValidator } from '../../shared/validators/birthday.validator';

@Component({
  selector: 'app-user-forms',
  standalone: true,
  imports: [FormComponent, NgForOf, NgIf],
  templateUrl: './user-forms.component.html',
  styleUrl: './user-forms.component.scss',
})
export class UserFormsComponent {
  private fb = inject(FormBuilder);
  private formService = inject(UserFormService);

  forms: FormGroup[] = [];
  maxForms = 10;
  isSubmitting: WritableSignal<boolean> = signal(false);
  timer: WritableSignal<number> = signal(0);

  intervalRef: any;

  constructor() {
    this.addForm();
  }

  addForm(): void {
    if (this.forms.length < this.maxForms) {
      const form = this.fb.group({
        country: [
          '',
          {
            validators: [Validators.required, countryValidator()],
            updateOn: 'blur',
          },
        ],
        username: [
          '',
          [Validators.required],
          [usernameValidator(this.formService)],
        ],
        birthday: ['', [Validators.required, birthdayValidator()]],
      });
      this.forms.push(form);
    }
  }

  removeForm(index: number): void {
    if (this.forms.length === 1) {
      // Reset the form instead of removing it. I add this just for usability instead of hiding the close button.
      this.forms[0].reset();
      return;
    }
    this.forms.splice(index, 1);
  }

  submitAllForms(): void {
    this.isSubmitting.set(true);
    this.timer.set(5);
    this.disableAllForms();

    this.intervalRef = setInterval(() => {
      this.timer.set(this.timer() - 1);
      if (this.timer() === 0) {
        this.restoreState();
        this.finishSubmitForms();
      }
    }, 1000);
  }

  finishSubmitForms(): void {
    const formData = this.forms.map((form) => form.getRawValue());
    this.formService.submitForms(formData).subscribe({
      next: (res) => {
        console.log(res.result);
        this.forms.forEach((form) => {
          form.reset();
        });
      },
      error: () => {
        console.error('An error occurred while submitting the forms');
      },
    });
  }

  cancelSubmit(): void {
    this.timer.set(0);
    this.restoreState();
  }

  disableAllForms() {
    this.forms.forEach((form) => form.disable());
  }

  enableAllForms() {
    this.forms.forEach((form) => form.enable());
  }

  restoreState() {
    clearInterval(this.intervalRef);
    this.isSubmitting.set(false);
    this.enableAllForms();
  }

  // Actually due to the fact that form is invalid if values are empty the invalid count will be visible from the start
  // we have multiple ways to handle that as we can trigger that on submit action or more complex to filter forms array
  // and check if all forms are valid before enabling the submit button. But i will leave it as is for simplicity as
  // technically it correctly shows invalid forms amount.
  get invalidFormsCount(): number {
    return this.forms.filter((form) => form.invalid).length;
  }
}
