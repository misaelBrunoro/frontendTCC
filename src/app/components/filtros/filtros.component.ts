import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DisciplinaService } from 'app/services/disciplina/disciplina.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {
  filtroForm: FormGroup;
  comboDisciplinas: any[];

  @Output() enviaFiltros  = new EventEmitter();

  constructor(
    private disciplinaService: DisciplinaService,
  ) { }

  ngOnInit() {
    this.filtroForm = new FormGroup({
      texto: new FormControl(''),
      disciplina: new FormControl(''),
      dataPublicacao: new FormControl(''),
    });
    this.loadComboDisciplina();
  }

  loadComboDisciplina() {
    this.disciplinaService.getList().subscribe((data: any[]) => {
      this.comboDisciplinas = data;
    });
  }

  onSubmitEnviarFiltros() {
    this.enviaFiltros.emit(this.filtroForm.value);
  }
}
