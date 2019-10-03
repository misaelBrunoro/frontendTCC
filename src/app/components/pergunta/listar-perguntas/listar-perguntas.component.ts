import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { PerguntaService } from '../../../services/pergunta/pergunta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventEmitterService } from '../../../services/event/event-emitter.service';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrls: ['./listar-perguntas.component.scss']
})
export class ListarPerguntasComponent implements OnInit {
  // Itens buscados
  pager = {};
  pageOfItems = [];
  filter = {};

  constructor(
      private perguntaService: PerguntaService,
      private route: ActivatedRoute,
      private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(x => {
        this.filteredLoadPage(x.page || 1);
    });

    EventEmitterService.get('sendFilter').subscribe(data => {
      this.filter = data;
      this.filteredLoadPage(1);
    });
  }

  filteredLoadPage(page) {
    this.perguntaService.filteredItems(page, this.filter).subscribe(x => {
      this.pager = x.pager;
      this.pageOfItems = x.pageOfItems;
    }, error => {
      this.toastr.error(error.error.errors, 'Buscar pergunta');
    });
  }
}
