import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableModule } from 'primeng/table'; // Import PrimeNG TableModule
import { EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css'
})
export class UnitListComponent {
  @Output() unitSelected = new EventEmitter<any>();
  @Output() unitsList = new EventEmitter<any>();
  units: any[] = [];
  filteredUnits: any[] = [];
  cols: any[] = [];
  isLoading: boolean = false;

  stateDictionary: { [key: string]: string } = {
    standing: 'Detenido',
    nodata: 'Sin datos',
    driving: 'Conduciendo'
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.cols = [
      { field: 'label', header: 'Unidad' },
      { field: 'lat', header: 'Latitud' },
      { field: 'lng', header: 'Longitud' },
      { field: 'state', header: 'Estado' },
    ];
    this.fetchUnits();
  }


  fetchUnits() {
    this.isLoading = true; // Mostrar el mensaje de carga
    this.apiService.getUnits().subscribe({
      next: (data: any) => {
        console.log('Data fetched:', data);
        this.units = data.data.units;
        this.filteredUnits = [...this.units]; // Inicializar los datos filtrados
        this.unitSelected.emit(this.units[0]);
        this.unitsList.emit(this.units);
        console.log('Units fetched successfully:', JSON.stringify(this.units));
        this.isLoading = false; // Ocultar el mensaje de carga
      },
      error: (error) => {
        console.error('Error fetching units:', error);
        this.isLoading = false; // Ocultar el mensaje de carga incluso si hay un error
      }
    });
  }

  getTranslatedState(state: string): string {
    return this.stateDictionary[state] || 'Estado desconocido';
  }

  onRowClick(raw: any) {
    console.log('Row clicked:', raw);
    this.unitSelected.emit(raw);
    // Aquí puedes manejar el evento de clic en la fila
  }

  onFilterChange(field: string, event: Event) {
    const inputElement = event.target as HTMLInputElement | HTMLSelectElement;
    const value = inputElement?.value || '';
    console.log(`Filtrando campo ${field} con valor ${value}`);
    const filterValue = value.toLowerCase();

    this.filteredUnits = this.units.filter((unit) => {
      if (field === 'label') {
        return unit.label?.toLowerCase().includes(filterValue);
      } else if (field === 'state') {
        // Si no se selecciona ningún valor, mostrar todos los estados
        if (!filterValue) {
          return true;
        }
        return unit.state?.name === filterValue;
      }
      return true;
    });
  }
}
