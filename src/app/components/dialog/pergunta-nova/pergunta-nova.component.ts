import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { Pergunta } from 'app/entities/pergunta.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-pergunta-nova',
  templateUrl: './pergunta-nova.component.html',
  styleUrls: ['./pergunta-nova.component.scss']
})
export class PerguntaNovaComponent implements OnInit {
  perguntaForm: FormGroup;
  isSendingLoginRequest = false;
  perguntaObject: Pergunta;

  constructor(
      private dialogRef: MatDialogRef<PerguntaNovaComponent>,
      private perguntaService: PerguntaService,
      private toastr: ToastrService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.perguntaForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      disciplina: new FormControl('', Validators.required)
    });
  }

  onSubmitEnviarPergunta() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.perguntaObject = new Pergunta();
        this.perguntaObject.titulo = this.perguntaForm.get('titulo').value;
        this.perguntaObject.descricao = this.perguntaForm.get('descricao').value;
        this.perguntaObject.disciplina = this.perguntaForm.get('disciplina').value;
        this.perguntaObject.resolvido = false;
        this.perguntaObject.userId = auth.uid;
        this.perguntaObject.anexo = 'N/A';
        this.perguntaObject.dataPublicacao = new Date();
        this.perguntaService.insert(this.perguntaObject);
        this.toastr.success('Pergunta enviada com sucesso', 'Envio de Pergunta');
        this.dialogRef.close();
      }
    });
  }

  onClickAnexo() {
    console.log(this.perguntaForm.value);
  }
}

