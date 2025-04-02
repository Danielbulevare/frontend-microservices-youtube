import { Component } from '@angular/core';
import { HeaderComponent } from '../Shared/Components/header/header.component';
import { MenuComponent } from '../Shared/Components/menu/menu.component';

@Component({
  selector: 'app-microservice-youtube',
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './microservice-youtube.component.html',
  styleUrl: './microservice-youtube.component.css',
})
export default class MicroserviceYoutubeComponent {}
