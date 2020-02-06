import { PerguntaService } from './../../../services/pergunta/pergunta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perguntas-similares',
  templateUrl: './perguntas-similares.component.html',
  styleUrls: ['./perguntas-similares.component.scss']
})
export class PerguntasSimilaresComponent implements OnInit {
  continuar: boolean;
  items: any;

  constructor(
    private perguntaService: PerguntaService
  ) { }

  ngOnInit() {}

}
