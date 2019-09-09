import { Component, OnInit } from '@angular/core';
import { PerguntaService } from '../../services/pergunta/pergunta.service';
import { Pergunta } from '../../entities/pergunta.model';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrls: ['./listar-perguntas.component.scss']
})
export class ListarPerguntasComponent implements OnInit {
  perguntas: Pergunta[];
  length = 50;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageEvent: PageEvent;

  constructor(
      private perguntaService: PerguntaService
  ) { }

  ngOnInit() {
    this.getPerguntasList();
  }

  getPerguntasList() {
    this.perguntaService.getPerguntasList().subscribe(actionArray => {
      this.perguntas = actionArray.map(item => {
        return {
          key: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Pergunta
      })
    });
  }
}
