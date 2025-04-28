import { Component, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';

// Sobrescribir el marcador predeterminado de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: ''
});

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

  setMapPosition(lat: number, lng: number) {
    if (this.map) {
      // Eliminar todos los marcadores existentes
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map?.removeLayer(layer);
        }
      });

      // Agregar un marcador personalizado
      const customIcon = L.divIcon({
        html: '<span class="material-symbols-outlined">minor_crash</span>',
        className: 'custom-marker-icon',
        iconSize: [30, 30], // Ajustar tamaño según sea necesario
        iconAnchor: [15, 15] // Ajustar punto de anclaje según sea necesario
      });

      // Agregar el marcador al mapa
      L.marker([lat, lng], { icon: customIcon }).addTo(this.map).bindPopup(`
        <strong>${this.unit.label}</strong><br>
        Lat: ${lat}<br>
        Lng: ${lng}<br>
        Estado: ${this.getTranslatedState(this.unit.state.name)}
      `).openPopup();

      // Centrar el mapa en las coordenadas del marcador
      this.map.setView([lat, lng], this.map.getZoom());
    }
  }
}
