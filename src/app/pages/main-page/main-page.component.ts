import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ScrollButtonComponent } from '../../scroll-button/scroll-button.component';
import { ThreeDCardComponent } from '../../three-d-card/three-d-card.component';
import { MagneticCircleComponent } from '../../magnetic-circle/magnetic-circle.component';
import { BorderedCircleComponent } from '../../bordered-circle/bordered-circle.component';
import * as languageData from '../../../assets/data/languages.json';
import * as frameworkData from '../../../assets/data/frameworks.json';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavbarComponent, ScrollButtonComponent, ThreeDCardComponent, MagneticCircleComponent, BorderedCircleComponent, NgFor],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  languages: any = (languageData as any).default;
  frameworks: any = (frameworkData as any).default;
}
