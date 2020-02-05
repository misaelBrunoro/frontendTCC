import { PerguntaService } from './../../../services/pergunta/pergunta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perguntas-similares',
  templateUrl: './perguntas-similares.component.html',
  styleUrls: ['./perguntas-similares.component.scss']
})
export class PerguntasSimilaresComponent implements OnInit {
  filtroForm: any;
  continuar: boolean;

  constructor(
    private perguntaService: PerguntaService
  ) { }

  ngOnInit() {
    this.perguntaService.filteredItems(1, this.filtroForm).subscribe(res =>{
      console.log(res);
    });
  }

}
