import { Component, OnInit } from '@angular/core';
import { PerguntaService } from '../../services/pergunta/pergunta.service';
import { Pergunta } from '../../entities/pergunta.model';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrls: ['./listar-perguntas.component.scss']
})
export class ListarPerguntasComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'disciplina', 'publicacao', 'status'];
  perguntas: Pergunta[];

  // Models for Input fields
  nameValue: string;
  placeValue: string;

  // Itens buscados
  tableData: any[] = [];

  // Salva o primeiro doc do snapshot recebido
  firstInResponse: any = [];

  // Salva o ultimo doc do snapshot recebido
  lastInResponse: any = [];

  // Mantem o array de documentos da pagina anterior
  prev_strt_at: any = [];

  // Quantidade de clicks para Proximo e Anterior
  pagination_clicked_count = 0;

  // Desabilita os botoes Proximo e Anterior
  disable_next: boolean = false;
  disable_prev: boolean = false;

  constructor(
      private perguntaService: PerguntaService
  ) { }


  ngOnInit() {
    this.loadItens();
  }

  loadItens() {
    this.perguntaService.loadItems().subscribe(response => {
      if (!response.length) {
        return false;
      }
      this.firstInResponse = response[0].payload.doc;
      this.lastInResponse = response[response.length - 1].payload.doc;

      this.tableData = [];
      for (const item of response) {
        this.tableData.push(item.payload.doc.data());
      }

      // Inicializa os valores
      this.prev_strt_at = [];
      this.pagination_clicked_count = 0;
      this.disable_next = false;
      this.disable_prev = false;

      // Adiciona o primeiro item para usar em Anterior
      this.push_prev_startAt(this.firstInResponse);
    }, error => {
      console.log('loadItens');
      console.log(error);
    });
  }

  // Mostra dataset Anterior
  prevPage(el: HTMLElement) {
    this.disable_prev = true;
    this.perguntaService.prevPage(this.firstInResponse, this.get_prev_startAt()).subscribe(response => {
      this.firstInResponse = response.docs[0];
      this.lastInResponse = response.docs[response.docs.length - 1];

      this.tableData = [];
      for (const item of response.docs) {
        this.tableData.push(item.data());
      }

      this.pagination_clicked_count--;

      // Pop em valor nao requerido no array
      this.pop_prev_startAt(this.firstInResponse);

      // Ativa botões denovo
      this.disable_prev = false;
      this.disable_next = false;
    }, error => {
      this.disable_prev = false;
    });

    el.scrollIntoView({behavior: 'smooth'});
  }

  // Monstrar proximo dataset
  nextPage(el: HTMLElement) {
    this.disable_next = true;
    this.perguntaService.nextPage(this.lastInResponse).subscribe(response => {

      if (!response.docs.length) {
        this.disable_next = true;
        return;
      }

      this.firstInResponse = response.docs[0];

      this.lastInResponse = response.docs[response.docs.length - 1];
      this.tableData = [];
      for (const item of response.docs) {
        this.tableData.push(item.data());
      }

      this.pagination_clicked_count++;

      this.push_prev_startAt(this.firstInResponse);

      this.disable_next = false;
    }, error => {
      this.disable_next = false;
    });

    el.scrollIntoView({behavior: 'smooth'});
  }

  push_prev_startAt(prev_first_doc) {
    this.prev_strt_at.push(prev_first_doc);
  }

  // Remove documento nao requerido
  pop_prev_startAt(prev_first_doc) {
    this.prev_strt_at.forEach(element => {
      if (prev_first_doc.data().id === element.data().id) {
        element = null;
      }
    });
  }

  // Retorna o Doc onde a pagina anterior irá iniciar
  get_prev_startAt() {
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1)) {
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    }
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }
}
