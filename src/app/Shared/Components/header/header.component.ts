import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../Core/Services/Auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.authService.refreshUserProfile();

    this.userName = signal<string>(
      this.authService.getUserInfo()?.name +
        ' ' +
        this.authService.getUserInfo()?.surnames
    );
  }
  private authService = inject(AuthService);

  private userName = signal<string>('');

  public getUserName(): string {
    return this.userName();
  }

  public logout(): void {
    this.authService.logout();
  }
}
