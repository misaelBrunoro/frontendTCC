import { Component, OnInit, Input } from '@angular/core';
import { ComentarioService } from 'app/services/comentario/comentario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  pageOfItems = [];
  comboTipos = ['Afirmação', 'Dúvida', 'Confirmação', 'Correção'];
  comentarioForm: FormGroup;
  @Input() ID_resposta;

  constructor(
    private comentarioService: ComentarioService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.comentarioForm = new FormGroup({
      descricao: new  FormControl(''),
      tipo: new  FormControl('', Validators.required),
    });

    this.loadItens();
  }

  onSubmitEnviarComentario() {
    if (this.comentarioForm.get('descricao').value !== '') {
      this.spinner.show();
      this.comentarioService.insert(this.comentarioForm.value, this.ID_resposta).subscribe(data => {
        this.toastr.success('Comentario enviado', 'Comentario');
        this.spinner.hide();
        this.loadItens();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
      this.comentarioForm.reset();
    }
  }

  loadItens() {
    this.comentarioService.loadItems( this.ID_resposta ).subscribe( data => {
      this.pageOfItems = data;
    })
  }
}
