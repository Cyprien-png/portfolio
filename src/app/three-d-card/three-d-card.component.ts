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
    const xFromCenter = event.layerX - card.offsetWidth / 2;
    const yFromCenter = card.offsetHeight / 2 - event.layerY ;

    const lightAngle = this.calculateLightAngle(xFromCenter, yFromCenter);

    light.style.transform = `translate(${-xFromCenter}px, ${yFromCenter}px) rotate(${-lightAngle}deg)`;
    card.style.transform = `rotateX(${this.calculateCardAngle(card.offsetHeight, yFromCenter)}deg)  rotateY(${this.calculateCardAngle(card.offsetWidth, xFromCenter)}deg)`;
  }

  calculateLightAngle(xFromCenter: number, yFromCenter: number) {
    return Math.atan(yFromCenter / xFromCenter) * (180 / Math.PI);
  }

  calculateCardAngle(cardLenght: number, curPosition: number) {
    return (curPosition / cardLenght * 14) 
  }
}
