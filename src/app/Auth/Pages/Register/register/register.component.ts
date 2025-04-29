import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterUserService } from '../../../../Core/Services/Register-user/register-user.service';
import { IUser } from '../../../../Core/Models/Entities/iuser';
import { ERole } from '../../../../Core/Models/Enums/e-role';
import { NotificationComponent } from '../../../../Shared/Components/notification/notification.component';
import { NotificationService } from '../../../../Core/Services/Notification/notification.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  private registerUserService = inject(RegisterUserService);
  private notificationService = inject(NotificationService);

  registerUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surnames: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  showNotification(message: string, alertType: string) {
    this.notificationService.showNotification(message, alertType);
  }

  public saveUser() {
    if (this.registerUserForm.valid) {
      const user: IUser = {
        id: undefined,
        name: this.name.value,
        surnames: this.surnames.value,
        userName: this.userName.value,
        email: this.email.value,
        password: this.password.value,
        role: ERole.USER,
      };

      this.registerUserService.saveUser(user).subscribe({
        next: (response: IUser) => {
          this.showNotification(
            'Usuario registrador correctamente.',
            'alert alert-success'
          );
          this.registerUserForm.reset();
        },
        error: (error: any) => {
          this.showNotification(
            'Error al registrar usuario.',
            'alert alert-danger'
          );
        },
      });
    }
  }

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
