import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ScrollButtonComponent } from '../../scroll-button/scroll-button.component';
import { ThreeDCardComponent } from '../../three-d-card/three-d-card.component';
import { MagneticCircleComponent } from '../../magnetic-circle/magnetic-circle.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent, ScrollButtonComponent, ThreeDCardComponent, MagneticCircleComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
