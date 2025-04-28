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

  ngOnChanges() {
    if (this.unit) {
      console.log('Nueva unidad recibida:', this.unit);
    }
  }
  
}
