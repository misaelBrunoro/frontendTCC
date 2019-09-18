import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { Pergunta } from 'app/entities/pergunta.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { FileValidator } from 'ngx-material-file-input';
import { UploadFilesService } from 'app/services/upload/upload-file.service';

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
      private authService: AuthService,
      private uploadService: UploadFilesService
  ) { }

  ngOnInit() {
    this.perguntaForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      disciplina: new FormControl('', Validators.required),
      file: new FormControl('', FileValidator.maxContentSize(5242880))
    });
  }

  async onSubmitEnviarPergunta() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.perguntaObject = new Pergunta();
        this.perguntaObject.userId = auth.uid;

        if (this.perguntaForm.get('file').value) {
          this.uploadAnexo(auth.uid).then(res => {
            console.log(res.State);
            if (res.State === 'success') {
              this.perguntaObject.anexo = res.Path;
              this.enviarPergunta();
            } else {
              this.toastr.error('Falha ao enviar anexo da pergunta');
            }
          });
        } else {
          this.enviarPergunta();
        }

      }
    });
  }

  enviarPergunta() {
    this.perguntaObject.titulo = this.perguntaForm.get('titulo').value;
    this.perguntaObject.descricao = this.perguntaForm.get('descricao').value;
    this.perguntaObject.disciplina = this.perguntaForm.get('disciplina').value;
    this.perguntaObject.resolvido = false;
    this.perguntaObject.dataPublicacao = new Date();
    this.perguntaService.insert(this.perguntaObject).then(response => {
      this.toastr.success('Pergunta enviada com sucesso', 'Envio de Pergunta');
    }).catch(error => {
      this.toastr.error(error, 'Falha ao enviar pergunta');
    });
    this.dialogRef.close();
  }

  uploadAnexo(uid: string): any {
    const File = this.perguntaForm.get('file').value;
    const Arquivo = {
      'File': File.files[0],
      'Caminho': '/Anexos/' + uid + '/' + File.files[0].name
    }
    return this.uploadService.upload(Arquivo).then(response => {
      return {
              'Path': Arquivo['Caminho'],
              'State': response.state
            };
    });
  }
}

