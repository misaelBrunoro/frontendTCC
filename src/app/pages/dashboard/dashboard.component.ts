import { DisciplinaService } from './../../services/disciplina/disciplina.service';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  disciplinas: any[];
  perguntas: any[];
  data: any[] = new Array();

  // Options
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
            stepSize: 1
          }
      }]
    }
  };

  // Grafico de linha
  lineChartData: ChartDataSets[] = new Array();
  lineChartLabels: Label[] = [];
  lineChartColors: Color[] = [
    {
      borderColor: '#2c3e50',
      backgroundColor: '#2ecc71',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  // Gráfico de barras
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = new Array();

  constructor(
    private perguntaService: PerguntaService,
    private disciplinaService: DisciplinaService
  ) { }

  ngOnInit() {
    this.disciplinaService.getList().subscribe(disc => {
      this.disciplinas =  disc;
      this.perguntaService.getList().subscribe(perg => {
        this.perguntas = perg;
        this.graficoDeLinha();
        this.graficoDeBarras();
      });
    });
  }

  graficoDeLinha() {
    this.disciplinas.forEach(disc => {
      const quantidade = this.perguntas.filter(perg => {
        return disc._id === perg.disciplina;
      });
      if (quantidade.length > 0) {
        this.data.push(quantidade.length);
      } else {
        this.data.push(0);
      }
      this.lineChartLabels.push(disc.nome);
    });
    this.lineChartData = [{ data: this.data,
                            label: 'Perguntas',
                          }];
    this.data = [];
  }

  graficoDeBarras() {
    this.disciplinas.forEach(disc => {
      const quantidade = this.perguntas.filter(perg => {
        return (disc._id === perg.disciplina && perg.resolvido === true);
      });
      if (quantidade.length > 0) {
        this.data.push(quantidade.length);
      } else {
        this.data.push(0);
      }
      this.barChartLabels.push(disc.nome);
    });
    this.barChartData = [{  data: this.data,
                            label: 'Respondidas',
                            borderColor: '#2c3e50',
                            backgroundColor: '#16a085',
                            hoverBackgroundColor: '#1abc9c',
                          }];
    this.data = [];
  }
}
