import { RespostaService } from './../../../services/resposta/resposta.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-resposta-nova',
  templateUrl: './resposta-nova.component.html',
  styleUrls: ['./resposta-nova.component.scss']
})
export class RespostaNovaComponent implements OnInit {
  respostaForm: FormGroup;
  ID_pergunta: any;

  constructor(
    private respostaService: RespostaService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.respostaForm = new FormGroup({
      descricao: new  FormControl('', Validators.required)
    });
  }

  onSubmitEnviarResposta() {
    this.spinner.show();
      this.respostaService.responder(this.ID_pergunta, this.respostaForm.value ).subscribe(data => {
        this.toastr.success('Resposta enviada', 'Resposta');
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }

}
