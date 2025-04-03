import { Component, inject, Input, signal } from '@angular/core';
import { NotificationService } from '../../../Core/Services/Notification/notification.service';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);

  message(): string {
    return this.notificationService.getMessage();
  }

  alertType(): string {
    return this.notificationService.getAlertType();
  }
}
