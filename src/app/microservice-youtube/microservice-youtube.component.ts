import { Component } from '@angular/core';
import { HeaderComponent } from '../Shared/Components/header/header.component';
import { MenuComponent } from '../Shared/Components/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-microservice-youtube',
  imports: [HeaderComponent, MenuComponent, RouterOutlet],
  templateUrl: './microservice-youtube.component.html',
  styleUrl: './microservice-youtube.component.css',
})
export default class MicroserviceYoutubeComponent {}
