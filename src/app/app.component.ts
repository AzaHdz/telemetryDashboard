import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { RouterOutlet } from '@angular/router';
import { MapViewComponent } from './components/map-view/map-view.component';
import { MetricsCardsComponent } from './components/metrics-cards/metrics-cards.component';
import { UnitListComponent } from './components/unit-list/unit-list.component';
import { MetricsGraphsComponent } from './components/metrics-graphs/metrics-graphs.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api'; // Importa PrimeNGConfig
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableModule } from 'primeng/table'; // Import PrimeNG TableModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapViewComponent, MetricsCardsComponent, UnitListComponent, MetricsGraphsComponent, HttpClientModule, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega esto
})
export class AppComponent implements OnInit { // Implementa OnInit
  title = 'dashboard-app';
  selectedUnit: any;



  constructor(private primengConfig: PrimeNGConfig) {} // Inyecta PrimeNGConfig

  ngOnInit() {
    this.primengConfig.ripple = true; // Activa el efecto ripple
  }

  miFuncion() {
    console.log('¡Función activada en B!');
  }
  onUniteSelected(event: any) {
    this.selectedUnit = event; // Guardas el dato
  }
}
