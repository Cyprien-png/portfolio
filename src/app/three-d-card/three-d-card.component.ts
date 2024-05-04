import { Component, Input } from "@angular/core";
import {NgFor} from "@angular/common";

@Component({
  selector: "app-three-d-card",
  standalone: true,
  imports: [NgFor],
  templateUrl: "./three-d-card.component.html",
  styleUrl: "./three-d-card.component.css",
})
export class ThreeDCardComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() imgSrc: string = "";
  @Input() labels: string[] = [];

  private focusSubscription?: ReturnType<typeof setTimeout> | void;

  changePerspective(event: any) {
    const light = event.target.querySelector(".light") as HTMLElement;
    const card = event.target as HTMLElement;
    const xFromCenter = event.layerX - card.offsetWidth / 2;
    const yFromCenter = card.offsetHeight / 2 - event.layerY;

    const lightAngle = this.calculateLightAngle(xFromCenter, yFromCenter);

    card.style.transition = ""
    light.style.transform = `translate(${-xFromCenter}px, ${yFromCenter}px) rotate(${-lightAngle}deg)`;
    card.style.transform = `rotateX(${this.calculateCardAngle(card.offsetHeight, yFromCenter)}deg)  rotateY(${this.calculateCardAngle(card.offsetWidth, xFromCenter)}deg)`;
  }

  calculateLightAngle(xFromCenter: number, yFromCenter: number) {
    return Math.atan(yFromCenter / xFromCenter) * (180 / Math.PI);
  }

  calculateCardAngle(cardLenght: number, curPosition: number) {
    return (curPosition / cardLenght) * 14;
  }

  resetPerspective(event: any) {
    const resetDuration = 1500;
    const card = (event.target as HTMLElement).getElementsByClassName("card")[0] as HTMLElement;
    const light = event.target.querySelector(".light") as HTMLElement;

    card.style.transition = `transform ${resetDuration}ms ease`;
    light.style.transform = `translate(0px, 0px) rotate(0deg)`;
    card.style.transform = `rotateY(0deg)  rotateX(0deg)`;

    setTimeout(() => {
      card.style.transition = "";
    }, resetDuration);
  }

  focusCard() {
    if (this.focusSubscription) clearTimeout(this.focusSubscription);
  }

  blurCard(event: any) {
    this.focusSubscription = setTimeout(() => {
      this.resetPerspective(event);
    }, 2000);
  }
}
