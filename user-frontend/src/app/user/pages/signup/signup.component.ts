import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.isPasswordMissMatch(),
    }
  );

  getControl(controlName: string) {
    return this.signupForm.get(controlName);
  }

  isPasswordMissMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      if (password === confirmPassword) {
        return null;
      } else {
        return { passwordMissMatch: true };
      }
    };
  }

  onSubmit() {}
}
