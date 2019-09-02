import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { Pergunta } from 'app/entities/pergunta.model';

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
  perguntaObject: Pergunta;

  constructor(
      private perguntaService: PerguntaService
  ) { }

  ngOnInit() {
    this.titulo = new FormControl('', Validators.required);
    this.descricao = new FormControl('', Validators.required);
    this.perguntaForm = new FormGroup({
      titulo: this.titulo,
      descricao: this.descricao
    });
  }

  onSubmitEnviarPergunta() {
    this.perguntaObject = new Pergunta();
    this.perguntaObject.titulo = this.titulo.value;
    this.perguntaObject.descricao = this.descricao.value;
    this.perguntaObject.disciplina = 'Calculo';
    this.perguntaObject.resolvido = false;
    this.perguntaObject.userId = '?';
    
    console.log(this.perguntaService.insert(this.perguntaObject));
  }

  onClickAnexo() {
     console.log('x');
  }
}

