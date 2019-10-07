import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';

@Component({
  selector: 'app-listar-respostas',
  templateUrl: './listar-respostas.component.html',
  styleUrls: ['./listar-respostas.component.scss']
})
export class ListarRespostasComponent implements OnInit {
  // Itens buscados
  pager = { pages: ''};
  pageOfItems = [];
  id: any;
  page: any;

  constructor(
    private perguntaService: PerguntaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(x => {
      this.page = x.page;
      this.route.params.subscribe(param => {
        this.id = param['id'];
        this.loadPage( );
      });
    });
  }

  loadPage( ) {
    this.spinner.show();
    this.perguntaService.buscarPorID(this.page, this.id).subscribe(x => {
      this.pager = x.pager;
      this.pageOfItems = x.pageOfItems;
      this.spinner.hide();
    }, error => {
      console.log(error);
    });
  }
}
