import { PerguntasSimilaresComponent } from './../perguntas-similares/perguntas-similares.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DisciplinaService } from 'app/services/disciplina/disciplina.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

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
      private spinner: NgxSpinnerService,
      private router: Router,
      private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.perguntaForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      disciplina: new FormControl('', Validators.required)
    });
    this.loadComboDisciplina();
  }

  loadComboDisciplina() {
    this.disciplinaService.getList().subscribe((data: any[]) => {
      this.comboDisciplinas = data;
    });
  }

  onSubmitEnviarPergunta() {
    let items: any = [];

    const filtroForm = {
      texto: this.perguntaForm.get('descricao').value
    };

    this.perguntaService.filteredItems(1, filtroForm).subscribe(res => {
      items = res.pageOfItems;
    });

    if (items.length > 0) {
      const dialogRef = this.dialog.open(PerguntasSimilaresComponent, {
        width: '550px',
        height: '400px',
      });
      (dialogRef.componentInstance).items = items;
    }
  }

  concluirEnvio() {
    this.perguntaService.insert(this.perguntaForm.value).subscribe(data => {
      this.toastr.success('Pergunta enviada com sucesso', 'Pergunta');
      this.spinner.hide();
      this.router.navigate(['/mural']);
    }, error => {
     console.log(error);
      this.spinner.hide();
    });
  }
}

