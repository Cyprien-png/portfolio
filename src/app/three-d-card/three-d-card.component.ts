import { Component } from "@angular/core";

@Component({
  selector: "app-three-d-card",
  standalone: true,
  imports: [],
  templateUrl: "./three-d-card.component.html",
  styleUrl: "./three-d-card.component.css",
})
export class ThreeDCardComponent {
  
  changePerspective(event: any) {
    const light = event.target.querySelector(".light") as HTMLElement;
    const card = (event.target as HTMLElement);

    const lightAngle = this.calculateLightAngle(event.layerX, event.layerY, card);

    light.style.transform = `rotate(${-lightAngle}deg)`;
  }

  calculateLightAngle(curX: number, curY: number, card: HTMLElement) {
    const xFromCenter = curX - card.offsetWidth / 2;
    const yFromCenter = card.offsetHeight / 2 - curY ;
    return Math.atan(yFromCenter / xFromCenter) * (180 / Math.PI);
  }

}
