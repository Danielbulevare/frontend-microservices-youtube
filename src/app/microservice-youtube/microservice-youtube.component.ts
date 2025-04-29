import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../Shared/Components/header/header.component';
import { MenuComponent } from '../Shared/Components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from '../Shared/Components/notification/notification.component';
import { NotificationService } from '../Core/Services/Notification/notification.service';

@Component({
  selector: 'app-microservice-youtube',
  imports: [
    HeaderComponent,
    MenuComponent,
    RouterOutlet,
    NotificationComponent,
  ],
  templateUrl: './microservice-youtube.component.html',
  styleUrl: './microservice-youtube.component.css',
})
export default class MicroserviceYoutubeComponent {
  private notificationService = inject(NotificationService);

  getMessage():string{
    return this.notificationService.getMessage();
  }

  getShowNotification():boolean{
    return this.notificationService.getShow();
  }
}
