import { Component, OnInit } from '@angular/core';
import { RespostaNovaComponent } from './../resposta-nova/resposta-nova.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

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
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
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

  onClickNovaResposta() {
    const dialogRef = this.dialog.open(RespostaNovaComponent, {
      width: '70%',
      height: '70%',
      panelClass: 'dialogClass'
    });
  }
}
