import { NgClass, NgFor } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private  form = viewChild<NgForm>('form');
  private destroyRef =  inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const parsedForm = JSON.parse(savedForm);
        const savedEmail = parsedForm.email;
        console.log('saved email', savedEmail);
        setTimeout(() => {
          this.form()?.controls['email'].setValue(savedEmail);
        },1);
      }
      console.log(this.form);
      const subscription = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe(
        {
          next:(value) => 
            window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}))
        });
        this.destroyRef.onDestroy(() =>   subscription?.unsubscribe());
    });
  } 


  onSubmit(formData: NgForm) {

    if (!formData.valid) {
      return;
    }
    console.log(formData);

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log(enteredEmail, enteredPassword);
    console.log(formData.form)

    formData.form.reset();


  }



}