import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private alertType = signal('');
  private message = signal('');
  private show = signal(false);

  private timeoutId: number | null = null;

  constructor() {}

  getMessage(): string {
    return this.message();
  }

  getAlertType():string{
    return this.alertType();
  }

  getShow():boolean{
    return this.show();
  }

  showNotification(message: string, alertType: string): void {
    //Este método controla cuanto tiempo debe mostrase la notificación
    this.show.set(true);
    this.message.set(message);
    this.alertType.set(alertType);

    
    this.timeoutId = setTimeout(() => {
      //Reseate el mensaje y el tipo de alerta asi como su visivilidad para que desaparezca de la UI al finalizar el tiempo
      this.message.set('');
      this.alertType.set('');
      this.show.set(false);
    }, 3000);
  }
}
