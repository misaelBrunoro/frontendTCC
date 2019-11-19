import { Component, OnInit } from '@angular/core';
import { PerguntaService } from '../../../services/pergunta/pergunta.service';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from '../../../services/event/event-emitter.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listar-perguntas',
  templateUrl: './listar-perguntas.component.html',
  styleUrls: ['./listar-perguntas.component.scss']
})
export class ListarPerguntasComponent implements OnInit {
  // Itens buscados
  pager = { pages: ''};
  pageOfItems = [];
  filter = {};

  constructor(
      private perguntaService: PerguntaService,
      private route: ActivatedRoute,
      private spinner: NgxSpinnerService
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
    this.spinner.show();
    this.perguntaService.filteredItems(page, this.filter).subscribe(x => {
      this.pager = x.pager;
      this.pageOfItems = x.pageOfItems;
      this.spinner.hide();
    }, error => {
      console.log(error);
    });
  }
  
}
