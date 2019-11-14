import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { RespostaNovaComponent } from './../resposta-nova/resposta-nova.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RespostaService } from 'app/services/resposta/resposta.service';
import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-respostas',
  templateUrl: './listar-respostas.component.html',
  styleUrls: ['./listar-respostas.component.scss']
})
export class ListarRespostasComponent implements OnInit {
  // Itens buscados
  pager = { pages: ''};
  pageOfItems = [];
  ID_pergunta: any;
  page: any;
  currentUser: any;
  currentPergunta = [];

  constructor(
    private userService: UserService,
    private respostaService: RespostaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private perguntaService: PerguntaService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.userService.currentUser().then(data => {
      this.currentUser = data;
      this.perguntaService.detalhes(this.ID_pergunta).subscribe(ret => {
        this.currentPergunta = ret;
      });
    });

    this.route.queryParams.subscribe(x => {
      this.page = x.page;
      this.route.params.subscribe(param => {
        this.ID_pergunta = param['id'];
        this.loadPage( );
      });
    });
  }

  loadPage( ) {
    this.spinner.show();
    this.respostaService.loadItems(this.page, this.ID_pergunta).subscribe(x => {
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
      panelClass: 'dialogClass',
    });

    (dialogRef.componentInstance).ID_pergunta = this.ID_pergunta;

    dialogRef.afterClosed().subscribe(result => {
      this.loadPage();
    });
  }

  onClickOficializar(ID_resposta) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      height: '210px',
    });
    (dialogRef.componentInstance).mensagem = 'Se houver outra resposta oficializada, esta ação irá substitui-la, deseja continuar?'

    dialogRef.afterClosed().subscribe(result => {
      if ((dialogRef.componentInstance).option) {
        if (this.currentPergunta[0].resposta[0]) {
          this.respostaService.oficializar(this.ID_pergunta, ID_resposta, this.currentPergunta[0].resposta[0]._id).subscribe(data => {
            this.toast.success('Resposta oficializada', 'Resposta');
          }, error => {
            console.log(error);
          });
        } else {
          this.respostaService.oficializar(this.ID_pergunta, ID_resposta, null).subscribe(data => {
            this.toast.success('Resposta oficializada', 'Resposta');
          }, error => {
            console.log(error);
          });
        }
      }
    });
  }

  verificarPermissao() {
    if (this.currentUser && this.currentPergunta.length > 0) {
      const vector = this.currentUser.disciplina.filter( el => {
        return el._id === this.currentPergunta[0].disciplina._id;
      });
      console.log(this.currentUser.disciplina);
      if (this.currentUser.tipo === 'Monitor' && vector.length > 0) {
        return true;
      } else if (this.currentUser.tipo === 'Professor' && vector.length > 0) {
        return true;
      } else if (this.currentUser._id === this.currentPergunta[0].usuario._id) {
        return true;
      }
      return false;
    }
  }

}
