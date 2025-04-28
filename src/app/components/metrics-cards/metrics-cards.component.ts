import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metrics-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics-cards.component.html',
  styleUrl: './metrics-cards.component.css'
})
export class MetricsCardsComponent implements OnChanges{
  @Input() unit: any;
  @Input() unitsList: any;
  generalData: any;

  constructor() {
    this.generalData = {
      totalOfUnits: 0,
    }
  
  }

  ngOnChanges() {
    if (this.unit) {
      console.log('Nueva unidad recibida:', this.unit);
      this.unit.directionMeaning = this.getDirectionMeaning(this.unit.direction);
    }
    if (this.unitsList) {
      console.log('Nueva lista de unidades recibida:', this.unitsList);
      this.generalData.totalOfUnits  = this.unitsList.length
    }
  }

  getDirectionMeaning(direction: number): string {
    if (direction >= 337.5 || direction < 22.5) {
      return 'Norte';
    } else if (direction >= 22.5 && direction < 67.5) {
      return 'Noreste';
    } else if (direction >= 67.5 && direction < 112.5) {
      return 'Este';
    } else if (direction >= 112.5 && direction < 157.5) {
      return 'Sureste';
    } else if (direction >= 157.5 && direction < 202.5) {
      return 'Sur';
    } else if (direction >= 202.5 && direction < 247.5) {
      return 'Suroeste';
    } else if (direction >= 247.5 && direction < 292.5) {
      return 'Oeste';
    } else if (direction >= 292.5 && direction < 337.5) {
      return 'Noroeste';
    } else {
      return 'Desconocido';
    }
  }


}
