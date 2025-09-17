import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs';
import { not } from 'rxjs/internal/util/not';


function mustContainQuestionMark(control: AbstractControl) {
  const value = control.value as string;
  if (!value) {
    return null;
  }
  return value.includes('?') ? null : { mustContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@email.com') {
    return of(null);
  }
  return of({notUnique: true});
};

  let initialEmailValue = '';
  const savedForm = window.localStorage.getItem('saved-login-form');
  if (savedForm) {
    const loadedForm = JSON.parse(savedForm);
    initialEmailValue = loadedForm.email || '';
  }

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit   {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: [emailIsUnique] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark] }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls['email'].invalid && 
      this.form.controls['email'].touched &&
      this.form.controls['email'].dirty
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls['password'].invalid &&
      this.form.controls['password'].touched &&
      this.form.controls['password'].dirty
    );
  }

  ngOnInit() {
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      this.form.setValue(JSON.parse(savedForm));
    }

   const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log('Form value changed:', value);
      next: (value: any) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }));
        window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.emai }));
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
      // Handle login logic here
      const enteredEmail = this.form.value.email;
      const enteredPassword = this.form.value.password;
    } else {
      console.log('Form is invalid');
    }
} 
}
