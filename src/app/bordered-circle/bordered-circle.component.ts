import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bordered-circle',
  standalone: true,
  imports: [],
  templateUrl: './bordered-circle.component.html',
  styleUrl: './bordered-circle.component.css'
})
export class BorderedCircleComponent {
  @Input() imgsrc = "";
  @Input() linkhref = "";

}
