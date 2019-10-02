import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { PerguntaService } from '../../../services/pergunta/pergunta.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrls: ['./listar-perguntas.component.scss']
})
export class ListarPerguntasComponent implements OnChanges, OnInit {
  // Itens buscados
  pager = {};
  pageOfItems = [];
  @Input() filtros;

  constructor(
      private perguntaService: PerguntaService,
      private route: ActivatedRoute,
      private toastr: ToastrService,
  ) { }

  ngOnChanges() {
    this.filteredLoadPage(1);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(x => {
      if (!this.filtros) {
        this.loadPage(x.page || 1)
      } else {
        this.filteredLoadPage(x.page || 1)
      }
    });
  }

  loadPage(page) {
    this.perguntaService.loadItems(page).subscribe(x => {
      this.pager = x.pager;
      this.pageOfItems = x.pageOfItems;
    }, error => {
      this.toastr.error(error.error.errors, 'Buscar pergunta');
    });
  }

  filteredLoadPage(page) {
    const body = this.filtros;
    this.perguntaService.filteredItems(page, body).subscribe(x => {
      this.pager = x.pager;
      this.pageOfItems = x.pageOfItems;
    }, error => {
      this.toastr.error(error.error.errors, 'Buscar pergunta');
    });
  }
}
