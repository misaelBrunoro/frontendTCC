import { Component, OnInit } from '@angular/core';
import { PerguntaService } from '../../services/pergunta/pergunta.service';
import { UserService } from 'app/services/user/user.service';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrls: ['./listar-perguntas.component.scss']
})
export class ListarPerguntasComponent implements OnInit {
  // Itens buscados
  tableData: any[];
  userData: any;

  constructor(
      private perguntaService: PerguntaService,
      private usuarioService: UserService
  ) {
    this.tableData = [];
    this.userData = {};
  }

  ngOnInit() {
    this.loadItens();
  }

  loadItens() {
    this.perguntaService.getList().subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  // Mostra dataset Anterior
  prevPage(el: HTMLElement) {

  }

  // Monstrar proximo dataset
  nextPage(el: HTMLElement) {

  }

}
