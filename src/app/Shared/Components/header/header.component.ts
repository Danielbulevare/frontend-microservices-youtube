import { Component, inject } from '@angular/core';
import { KeycloakService } from '../../../Core/Services/Keycloak/keycloak.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private keycloakService = inject(KeycloakService);

  async logout() {
    this.keycloakService.logout();
  }

  get userName(): string | undefined {
    return this.keycloakService.profile?.username;
  }
}
