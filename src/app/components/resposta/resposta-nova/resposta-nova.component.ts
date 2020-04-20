import { RespostaService } from './../../../services/resposta/resposta.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resposta-nova',
  templateUrl: './resposta-nova.component.html',
  styleUrls: ['./resposta-nova.component.scss']
})
export class RespostaNovaComponent implements OnInit {
  respostaForm: FormGroup;
  ID_pergunta: any;
  editMode: boolean;
  ID_resposta: any;

  constructor(
    private respostaService: RespostaService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialogRef: MatDialogRef<RespostaNovaComponent>,
  ) { }

  ngOnInit() {
    this.respostaForm = new FormGroup({
      descricao: new  FormControl('', Validators.required)
    });

    if (this.editMode) {
      this.respostaService.getByID(this.ID_resposta).subscribe(res => {
        this.respostaForm.get('descricao').setValue(res.descricao);
      });
    }
  }

  onSubmitEnviarResposta() {
    this.spinner.show();
    if (!this.editMode) {
      this.respostaService.insert( this.respostaForm.value, this.ID_pergunta ).subscribe(data => {
        this.toastr.success('Resposta enviada', 'Resposta');
        this.spinner.hide();
        this.dialogRef.close();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
    } else {
      this.respostaService.update( this.ID_resposta, this.respostaForm.value ).subscribe(data => {
        this.toastr.success('Resposta atualizada', 'Resposta');
        this.spinner.hide();
        this.dialogRef.close();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
    }
  }

}
