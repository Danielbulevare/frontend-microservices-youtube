import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  registerUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surnames: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.registerUserForm.get('name') as FormControl;
  }
  get surnames() {
    return this.registerUserForm.get('surnames') as FormControl;
  }
  get email() {
    return this.registerUserForm.get('email') as FormControl;
  }
  get password() {
    return this.registerUserForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registerUserForm.get('confirmPassword') as FormControl;
  }
  get userName() {
    return this.registerUserForm.get('userName') as FormControl;
  }
}
