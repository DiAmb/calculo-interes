import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { max, min } from 'rxjs';
import { InteresService } from 'src/app/services/interes.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  form: FormGroup;
  resultado: any[] = [];
  mostrarGrafico = false;
  datasets: any[] = [];
  options: any;
  labels: string[] = [];

  constructor(private fb: FormBuilder, private interesService: InteresService) {
    this.form = this.fb.group({
      montoInicial: [1000, [Validators.required, Validators.min(1)]],
      tasaInteres: [5, [Validators.required, Validators.min(0)]],
      anios: [5, [Validators.required, Validators.min(1)]],
    });
  }

  calcular() {
    if (this.form.valid) {
      this.interesService
        .calcularInteres(this.form.value)
        .subscribe((response) => {
          this.resultado = response.valores;
          this.datasets = [
            {
              data: this.resultado.map((v) => v.monto),
              label: 'Monto acumulado',
              borderColor: 'blue',
              fill: true,
              pointRadius: 15,
            },
          ];
          this.labels = this.resultado.map((v) => 'Año ' + v.anio);
          this.mostrarGrafico = true;
        });
    }
  }
  ngOnInit() {
    this.options = {
      responsive: true,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: {
              dataset: { label: string };
              raw: any;
            }) {
              const label = context.dataset.label || '';
              const value = context.raw;
              const formattedValue = value.toLocaleString('es-GT', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              return `${label}: Q${formattedValue}`;
            },
          },
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleColor: '#fff',
          bodyColor: '#fff',
        },
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 15,
              weight: 'bold',
            },
            color: '#333',
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Años',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            lineWidth: 1,
          },
        },
        y: {
          title: {
            display: true,
            text: 'Monto acumulado (Q)',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            lineWidth: 1,
          },
        },
      },
    };
  }
}
