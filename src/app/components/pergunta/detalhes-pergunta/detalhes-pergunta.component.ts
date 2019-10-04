import { Component, OnInit } from '@angular/core';
import { RespostaService } from 'app/services/resposta/resposta.service';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detalhes-pergunta',
  templateUrl: './detalhes-pergunta.component.html',
  styleUrls: ['./detalhes-pergunta.component.scss']
})
export class DetalhesPerguntaComponent implements OnInit {
  pergunta = {
              titulo: '',
              descricao: '',
              usuario: { nomeReal: '' },
              disciplina: { nome: '', createdAt: new Date },
            };
  respostaOficial: any;

  constructor(
    private respostaService: RespostaService,
    private perguntaService: PerguntaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.findByIDPergunta(param['id']);
    });
  }

  findByIDPergunta(id) {
    this.spinner.show();
    this.perguntaService.findByID(id).subscribe(data => {
      this.pergunta = data[0];
      this.spinner.hide();
    });
  }

}
