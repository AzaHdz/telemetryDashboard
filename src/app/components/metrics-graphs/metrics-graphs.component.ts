import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';

// Registra los controladores de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-metrics-graphs',
  standalone: true,
  templateUrl: './metrics-graphs.component.html',
  styleUrl: './metrics-graphs.component.css'
})
export class MetricsGraphsComponent implements AfterViewInit {
  @ViewChild('temperatureChart') temperatureChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fuelConsumptionChart') fuelConsumptionChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('speedChart') speedChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('idleTimeChart') idleTimeChartRef!: ElementRef<HTMLCanvasElement>;
  @Input() unit: any;

  temperatureChartInstance: Chart | null = null;
  fuelConsumptionChartInstance: Chart | null = null;
  speedChartInstance: Chart | null = null;
  idleTimeChartInstance: Chart | null = null;

  // Fechas seleccionadas
  dateRanges = {
    temperature: { from: this.getYesterdayDate(), till: this.getTodayDate() },
    fuel: { from: this.getDaysAgoDate(7), till: this.getTodayDate() }, // Desde 7 días atrás
    speed: { from: this.getYesterdayDate(), till: this.getTodayDate() },
    idle: { from: this.getDaysAgoDate(7), till: this.getTodayDate() }, // Desde 7 días atrás
  };

  ngAfterViewInit() {
    this.createTemperatureChart();
    this.createFuelConsumptionChart();
    this.createSpeedChart();
    this.createIdleTimeChart(); // Crear el gráfico de tiempo inactivo
  }

  onDateChange(chartType: keyof typeof this.dateRanges, rangeType: 'from' | 'till', event: Event) {
    const input = event.target as HTMLInputElement;
    this.dateRanges[chartType][rangeType] = input.value;
    console.log(`Updated ${chartType} ${rangeType} date:`, input.value);

    // Generar nuevos datos y actualizar el gráfico
    this.updateChart(chartType);
  }

  ngOnChanges() {
    if (this.unit) {
      console.log('Nueva unidad recibida:', this.unit);
      this.createTemperatureChart(this.generateTemperatureData());
      this.createFuelConsumptionChart(this.generateFuelConsumptionData(7));
      this.createSpeedChart(this.generateSpeedData());
      this.createIdleTimeChart(this.generateIdleTimeData(7));
    }
  }

  updateChart(chartType: keyof typeof this.dateRanges) {
    console.log(`Updating ${chartType} chart with date range:`, this.dateRanges[chartType]);

    // Generar nuevos datos simulados
    if (chartType === 'temperature') {
      const newData = Array.from({ length: 24 }, () => Math.random() * 100);
      this.createTemperatureChart(newData);
    } else if (chartType === 'fuel') {
      const newData = this.generateFuelConsumptionData(7);
      this.createFuelConsumptionChart(newData);
    } else if (chartType === 'speed') {
      const newData = Array.from({ length: 24 }, () => Math.random() * 100);
      this.createSpeedChart(newData);
    } else if (chartType === 'idle') {
      const newData = this.generateIdleTimeData(7);
      this.createIdleTimeChart(newData);
    }
  }

  createTemperatureChart(data: number[] = this.generateTemperatureData()) {
    // Destruir el gráfico existente si ya está creado
    if (this.temperatureChartInstance) {
      this.temperatureChartInstance.destroy();
    }

    // Crear un nuevo gráfico
    this.temperatureChartInstance = new Chart(this.temperatureChartRef.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: this.generateTimeLabels(),
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
      } as ChartOptions,
    });
  }

  createFuelConsumptionChart(data: number[] = this.generateFuelConsumptionData(7)) {
    // Destruir el gráfico existente si ya está creado
    if (this.fuelConsumptionChartInstance) {
      this.fuelConsumptionChartInstance.destroy();
    }

    // Crear un nuevo gráfico
    this.fuelConsumptionChartInstance = new Chart(this.fuelConsumptionChartRef.nativeElement, {
      type: 'bar' as ChartType,
      data: {
        labels: this.generateDailyLabels(7), // Etiquetas de los últimos 7 días
        datasets: [
          {
            label: 'Consumo de combustible (L)',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fecha',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Consumo de combustible (L)',
            },
            beginAtZero: true,
          },
        },
      } as ChartOptions,
    });
  }

  createSpeedChart(data: number[] = this.generateSpeedData()) {
    // Destruir el gráfico existente si ya está creado
    if (this.speedChartInstance) {
      this.speedChartInstance.destroy();
    }

    // Crear un nuevo gráfico
    this.speedChartInstance = new Chart(this.speedChartRef.nativeElement, {
      type: 'line' as ChartType,
      data: {
        labels: this.generateTimeLabels(),
        datasets: [
          {
            label: 'Velocidad (km/h)',
            data: data,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tiempo',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Velocidad (km/h)',
            },
          },
        },
      } as ChartOptions,
    });
  }

  createIdleTimeChart(data: { idle: number[]; active: number[] } = this.generateIdleTimeData(7)) {
    // Destruir el gráfico existente si ya está creado
    if (this.idleTimeChartInstance) {
      this.idleTimeChartInstance.destroy();
    }

    // Crear un nuevo gráfico
    this.idleTimeChartInstance = new Chart(this.idleTimeChartRef.nativeElement, {
      type: 'bar' as ChartType,
      data: {
        labels: this.generateDailyLabels(7), // Etiquetas de los últimos 7 días
        datasets: [
          {
            label: 'Tiempo Inactivo (horas)',
            data: data.idle,
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color para tiempo inactivo
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
          },
          {
            label: 'Tiempo Activo (horas)',
            data: data.active,
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // Color para tiempo activo
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            stacked: true, // Habilitar apilamiento en el eje X
            title: {
              display: true,
              text: 'Fecha',
            },
          },
          y: {
            stacked: true, // Habilitar apilamiento en el eje Y
            title: {
              display: true,
              text: 'Tiempo (horas)',
            },
            beginAtZero: true,
          },
        },
      } as ChartOptions,
    });
  }

  // Métodos para generar datos simulados
  generateTimeLabels(): string[] {
    const labels = [];
    for (let i = 23; i >= 0; i--) {
      const time = new Date();
      time.setHours(time.getHours() - i);
      labels.push(
        `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`
      );
    }
    return labels.reverse();
  }

  generateDailyLabels(days: number): string[] {
    const labels = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toISOString().split('T')[0]); // Formato YYYY-MM-DD
    }
    return labels;
  }

  generateTemperatureData(): number[] {
    return Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * (30 - 15 + 1)) + 15
    );
  }

  generateFuelConsumptionData(days: number = 7): number[] {
    return Array.from({ length: days }, () => Math.random() * (10 - 2) + 2); // 2L a 10L por día
  }

  generateSpeedData(): number[] {
    return Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * (120 - 30 + 1)) + 30
    );
  }

  generateIdleTimeData(days: number = 7): { idle: number[]; active: number[] } {
    const idle = Array.from({ length: days }, () => Math.random() * (8 - 2) + 2); // 2 a 8 horas inactivas
    const active = Array.from({ length: days }, () => Math.random() * (10 - 4) + 4); // 4 a 10 horas activas
    return { idle, active };
  }

  // Métodos para obtener las fechas iniciales
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getYesterdayDate(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }

  getDaysAgoDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }
}
