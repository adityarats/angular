import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, first, of } from 'rxjs';


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

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
  const value1 = control.get(controlName1)?.value;
  const value2 = control.get(controlName2)?.value;

  if (value1 && value2 && value1 !== value2) {
    return { notEqual: true };
  }
  return null;
}
}

  let initialEmailValue = '';
  const savedForm = window.localStorage.getItem('saved-login-form');
  if (savedForm) {
    const loadedForm = JSON.parse(savedForm);
    initialEmailValue = loadedForm.email || '';
  }

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private destroyRef = inject(DestroyRef);
    form = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: [emailIsUnique] }),
      passwords: new FormGroup({
        password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark] }),
        confirmPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark] }),
      }),
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),

      address: new FormGroup({
        street: new FormControl('', { validators: [Validators.required] }),
        number: new FormControl('', { validators: [Validators.required] }),
        postalCode: new FormControl('', { validators: [Validators.required] }),
        city: new FormControl('', { validators: [Validators.required] }),
        country: new FormControl('', { validators: [Validators.required] }),
      }, { validators: [equalValues('password', 'confirmPassword')] }),
    
      role: new FormControl<'student'|'teacher'|'employee'|'founder'|'other'>('student', 
        { validators: [Validators.required] }),

      source: new FormArray([ 
        new FormControl('GOOGLE'),
        new FormControl('REFERRED BY FRIEND'),
        new FormControl('OTHER'),
      ]),
      agree: new FormControl(false, { validators: [Validators.requiredTrue] }),
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
        (this.form.controls['passwords'] as FormGroup).controls['password'].invalid &&
        (this.form.controls['passwords'] as FormGroup).controls['password'].touched &&
        (this.form.controls['passwords'] as FormGroup).controls['password'].dirty
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
        const enteredPassword = this.form.value.passwords?.password;
      } else {
        console.log('Form is invalid');
      }
  } 

  onReset() {
    this.form.reset();
  }
}
