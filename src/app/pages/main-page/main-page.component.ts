import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ScrollButtonComponent } from '../../scroll-button/scroll-button.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent, ScrollButtonComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
