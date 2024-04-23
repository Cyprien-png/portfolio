import { Component, Input } from "@angular/core";

@Component({
  selector: "app-scroll-button",
  standalone: true,
  imports: [],
  templateUrl: "./scroll-button.component.html",
  styleUrl: "./scroll-button.component.css",
})
export class ScrollButtonComponent {
  @Input() targetID = "";


  scroll() {
    const target = document.getElementById(this.targetID);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }
}
