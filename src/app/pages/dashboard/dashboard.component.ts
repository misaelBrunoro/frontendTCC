import { DisciplinaService } from './../../services/disciplina/disciplina.service';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  disciplinas: any[];
  perguntas: any[];
  data: any[] = new Array();

  // Grafico de barras
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = new Array();
  barChartData: ChartDataSets[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  constructor(
    private perguntaService: PerguntaService,
    private disciplinaService: DisciplinaService
  ) { }

  ngOnInit() {
    this.disciplinaService.getList().subscribe(disc => {
      this.disciplinas =  disc;
      this.perguntaService.getList().subscribe(perg => {
        this.perguntas = perg;
        this.graficoDeBarras();
      });
    });
  }

  graficoDeBarras() {
    this.disciplinas.forEach(disc => {
      const quantidade = this.perguntas.filter(perg => {
        return disc._id === perg.disciplina;
      });
      if (quantidade.length > 0) {
        this.data.push(quantidade.length);
      } else {
        this.data.push(0);
      }
      this.barChartLabels.push(disc.nome);
    });
    this.barChartData = [{  data: this.data,
                            label: 'Perguntas',
                            backgroundColor: '#2D142C',
                            hoverBackgroundColor: '#510A32',
                            borderColor: '#510A32'
                        }];
  }

}
