import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputValidation]',
  standalone: true,
})
export class InputValidationDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl,
  ) {}

  ngOnInit() {
    const inputElement = this.el.nativeElement;
    const controlName = inputElement.getAttribute('formControlName');

    this.control?.statusChanges?.subscribe(() => {
      if (
        this.control &&
        this.control.invalid &&
        (this.control.dirty || this.control.touched)
      ) {
        this.renderer.addClass(inputElement, 'is-invalid');
        let errorMessage =
          inputElement.parentElement.querySelector('.invalid-feedback');
        if (!errorMessage) {
          errorMessage = this.renderer.createElement('div');
          this.renderer.addClass(errorMessage, 'invalid-feedback');
          errorMessage.innerText = `Please provide a correct ${controlName}`;
          this.renderer.appendChild(inputElement.parentElement, errorMessage);
        }
      } else {
        this.renderer.removeClass(inputElement, 'is-invalid');
        const feedback =
          inputElement.parentElement.querySelector('.invalid-feedback');
        if (feedback) {
          this.renderer.removeChild(inputElement.parentElement, feedback);
        }
      }
    });
  }
}
