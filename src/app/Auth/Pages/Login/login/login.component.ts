import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../Core/Services/Auth/auth.service';
import { IAuth } from '../../../../Core/Models/Requests/i-auth';
import { NotificationComponent } from '../../../../Shared/Components/notification/notification.component';
import { NotificationService } from '../../../../Core/Services/Notification/notification.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NotificationComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) {}

  showNotification(message: string, alertType: string) {
    this.notificationService.showNotification(message, alertType);
  }

  public login() {
    if (this.loginForm.valid) {
      const auth: IAuth = {
        userName: this.name.value,
        password: this.password.value,
      };

      this.authService.token(auth).subscribe({
        next: (response: string) => {
          this.router.navigate(['/microservice-youtube/videos']);
        },
        error: (error: any) => {
          this.showNotification(
            'Error al iniciar sesión.',
            'alert alert-danger'
          );
        },
      });
    }
  }

  get name() {
    return this.loginForm.get('name') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
