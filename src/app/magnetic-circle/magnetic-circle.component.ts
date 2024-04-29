import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-magnetic-circle',
  standalone: true,
  imports: [],
  templateUrl: './magnetic-circle.component.html',
  styleUrl: './magnetic-circle.component.css'
})
export class MagneticCircleComponent {
  @Input() icon = "";
  @Input() name = "";

  magnetize(event: any){
    const magneticArea = event.target as HTMLElement
    const techno = magneticArea.querySelector('.techno') as HTMLElement

    const xPosition = (event.layerX - (magneticArea.clientWidth / 2 )) / 4
    const yPosition = (event.layerY - (magneticArea.clientHeight / 2 )) / 4

    techno.style.transform = `translate(${xPosition}px, ${yPosition}px)`
  }

  demagnetize(event: any){
    const techno = (event.target as HTMLElement).querySelector('.techno') as HTMLElement
    techno.style.transform = `translate(0px, 0px)`
  }
}
