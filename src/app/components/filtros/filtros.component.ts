import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerguntaService } from 'app/services/pergunta/pergunta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DisciplinaService } from 'app/services/disciplina/disciplina.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {
  filtroForm: FormGroup;
  comboDisciplinas: any[];

  constructor(
    private perguntaService: PerguntaService,
    private spinner: NgxSpinnerService,
    private disciplinaService: DisciplinaService,
  ) { }

  ngOnInit() {
    this.filtroForm = new FormGroup({
      texto: new FormControl(''),
      disciplina: new FormControl(''),
      dataInicial: new FormControl(''),
      dataFinal: new FormControl(''),
    });
    this.loadComboDisciplina();
  }

  loadComboDisciplina() {
    this.disciplinaService.getList().subscribe((data: any[]) => {
      this.comboDisciplinas = data;
    });
  }

  onSubmitEnviarFiltros() {
    this.perguntaService.filteredItems(this.filtroForm.value).subscribe(data => {
      console.log(data);
    });
  }
}
