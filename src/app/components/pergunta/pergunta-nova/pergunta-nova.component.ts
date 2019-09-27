import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { ToastrService } from 'ngx-toastr';
import { FileValidator } from 'ngx-material-file-input';
import { UploadFilesService } from 'app/services/upload/upload-file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DisciplinaService } from 'app/services/disciplina/disciplina.service';

@Component({
  selector: 'app-pergunta-nova',
  templateUrl: './pergunta-nova.component.html',
  styleUrls: ['./pergunta-nova.component.scss']
})
export class PerguntaNovaComponent implements OnInit {
  perguntaForm: FormGroup;
  comboDisciplinas: any[];

  constructor(
      private perguntaService: PerguntaService,
      private disciplinaService: DisciplinaService,
      private toastr: ToastrService,
      private uploadService: UploadFilesService,
      private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.perguntaForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      disciplina: new FormControl('', Validators.required),
      anexo: new FormControl(''),
      file: new FormControl('', FileValidator.maxContentSize(5242880))
    });
    this.loadComboDisciplina();
  }

  loadComboDisciplina() {
    this.disciplinaService.getList().subscribe((data: any[]) => {
      this.comboDisciplinas = data;
      console.log(data);
    });
  }

  onSubmitEnviarPergunta() {
    console.log(this.perguntaForm.value);
    this.perguntaForm.removeControl('file');
    if (this.perguntaForm.get('anexo').value === '') {
      this.perguntaForm.removeControl('anexo');
    }
    console.log(this.perguntaForm.value);
    // TODO ENVIAR ANEXO VERIFICAR SE FOI E DEPOIS A PERGUNTA
    this.enviarPergunta();
  }

  enviarPergunta() {
    this.spinner.show();
    this.perguntaService.insert(this.perguntaForm.value).subscribe(data => {
      this.toastr.success('Pergunta enviada com sucesso', 'Pergunta');
      this.spinner.hide();
    }, error => {
      this.toastr.error(error['error']['errors'], 'Falha ao enviar pergunta');
      this.spinner.hide();
    });
  }

  uploadAnexo(uid: string): any {
    const file = this.perguntaForm.get('file').value;
    const Arquivo = {
      'File': file.files[0],
      'Caminho': '/Anexos/' + uid + '/' + file.files[0].name
    }
    return this.uploadService.upload(Arquivo);
  }
}

