import { Component, OnInit } from '@angular/core';
import { PerguntaService } from '../../../services/pergunta/pergunta.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrls: ['./listar-perguntas.component.scss']
})
export class ListarPerguntasComponent implements OnInit {
  // Itens buscados
  pager = {};
  pageOfItems = [];

  constructor(
      private perguntaService: PerguntaService,
      private route: ActivatedRoute,
      private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(x => this.loadPage(x.page || 1));
  }

  loadPage(page) {
    this.perguntaService.loadItems(page).subscribe(x => {
      this.pager = x.pager;
      this.pageOfItems = x.pageOfItems;
    }, error => {
      this.toastr.error(error.error.errors, 'Buscar pergunta');
    });
  }
}
