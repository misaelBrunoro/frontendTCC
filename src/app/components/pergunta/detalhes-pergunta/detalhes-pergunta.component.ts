import { Pergunta } from './../../../entities/pergunta.model';
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

  constructor(
    private perguntaService: PerguntaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.id = param['id'];
      this.detalhesPergunta();
    });
  }

  detalhesPergunta( ) {
    this.perguntaObject = new Pergunta();
    this.spinner.show();
    this.perguntaService.detalhes(this.id).subscribe(data => {
      this.perguntaObject = data[0];
      this.spinner.hide();
    });
  }

  onClickSessaoRespostas() {
    this.router.navigate(['mural/detalhe-pergunta/respostas/', this.id]);
  }
}
