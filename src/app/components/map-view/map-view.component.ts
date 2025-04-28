import { Component, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  standalone: true,
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnChanges{
  @Input() selectedUnit: any; // Recibe la unidad seleccionada
  @Input() unit: any;

  map: L.Map | undefined;
  stateDictionary: { [key: string]: string } = {
    standing: 'Detenido',
    nodata: 'Sin datos',
    driving: 'Conduciendo'
  };

  ngOnInit() {
    console.log('MapViewComponent initialized');
    this.map = L.map('map', {
      center: [51.505, -0.09], // Initial center position
      zoom: 13 // Initial zoom level
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  onUniteSelected(data: string) {
    console.log('Datos recibidos:', data);
    this.miFuncion();
  }

  miFuncion() {
    console.log('¡Función activada en B!');
  }

  ngOnChanges() {
    if (this.unit) {
      console.log('Nueva unidad recibida:', this.unit);
      this.setMapPosition(this.unit.lat, this.unit.lng);
  }
}

getTranslatedState(state: string): string {
  return this.stateDictionary[state] || 'Estado desconocido';
}
      // Aquí puedes activar la función que quieras
  setMapPosition(lat: number, lng: number) {
    if (this.map) {
      this.map.setView([lat, lng], 13); // Cambia la vista del mapa a la nueva posición
      L.marker([lat, lng]).addTo(this.map).bindPopup(`
        <strong>${this.unit.label}</strong><br>
        Lat: ${lat}<br>
        Lng: ${lng}<br>
        Estado: ${this.getTranslatedState(this.unit.state.name)}
      `).openPopup();
      const customIcon = L.divIcon({
        html: '<span class="material-symbols-outlined">minor_crash</span>',
        className: 'custom-marker-icon',
        iconSize: [30, 30], // Adjust size as needed
        iconAnchor: [15, 15] // Adjust anchor point as needed
      });
      L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
    }
  }
 
}
