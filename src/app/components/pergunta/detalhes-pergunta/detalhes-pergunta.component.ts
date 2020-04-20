import { UserService } from './../../../services/user/user.service';
import { EventEmitterService } from './../../../services/event/event-emitter.service';
import { Component, OnInit } from '@angular/core';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detalhes-pergunta',
  templateUrl: './detalhes-pergunta.component.html',
  styleUrls: ['./detalhes-pergunta.component.scss']
})

export class DetalhesPerguntaComponent implements OnInit {
  perguntaObject: any = {};
  id: any;
  date = new Date;
  currentUser: any;

  constructor(
    private perguntaService: PerguntaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.id = param['id'];
      this.detalhesPergunta();
    });
  }

  detalhesPergunta( ) {
    this.spinner.show();
    this.perguntaService.detalhes(this.id).subscribe(data => {
      this.perguntaObject = data[0];
      this.spinner.hide();
    });

    this.userService.currentUser().then(res => {
      this.currentUser = res;
    });
  }

  onClickSessaoRespostas() {
    this.router.navigate(['mural/detalhe-pergunta/respostas/', this.id]);
  }

  onClickEditarPergunta() {
    this.router.navigate(['mural/nova-pergunta', this.id]);
  }

  habilitarEdit() {
    if (this.currentUser && this.perguntaObject) {
      if (this.currentUser._id === this.perguntaObject.usuario._id ) {
        return true;
      }
      if (this.currentUser.tipo === 'Professor') {
        const vector = this.currentUser.disciplina.filter( el => {
          return el._id === this.perguntaObject.disciplina._id;
        });
        if (vector.length > 0) {
          return true;
        }
      }
    }
    return false;
  }
}
