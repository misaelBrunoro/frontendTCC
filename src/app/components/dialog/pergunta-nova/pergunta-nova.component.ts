import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PerguntaService } from '../../../services/pergunta/pergunta.service';
import { PerguntaDataService } from '../../../services/pergunta/pergunta-data.service';
import { Pergunta } from '../../../entities/pergunta.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-pergunta-nova',
  templateUrl: './pergunta-nova.component.html',
  styleUrls: ['./pergunta-nova.component.scss']
})
export class PerguntaNovaComponent implements OnInit {
  titulo: FormControl;
  descricao: FormControl;
  perguntaForm: FormGroup;
  isSendingLoginRequest = false;
  objectPergunta: Pergunta;

  constructor(
      private perguntaService: PerguntaService,
      private perguntaDataService: PerguntaDataService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.titulo = new FormControl('', Validators.required);
    this.descricao = new FormControl('', Validators.required);
    this.perguntaForm = new FormGroup({
      titulo: this.titulo,
      descricao: this.descricao
    });

    this.objectPergunta = new Pergunta();
  }

  onSubmitEnviarPergunta() {
      if (this.objectPergunta.$key) {

      } else {
          this.objectPergunta.titulo    = this.titulo.value;
          this.objectPergunta.descricao = this.descricao.value;
          this.objectPergunta.resolvido = false;
          this.objectPergunta.anexo     = 'SemAnexo';
          this.perguntaService.insert(this.objectPergunta);
      }

      this.objectPergunta = new Pergunta();
  }

  onClickAnexo() {
     console.log('x');
  }
}

