import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DisciplinaService } from 'app/services/disciplina/disciplina.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-disciplinas',
  templateUrl: './listar-disciplinas.component.html',
  styleUrls: ['./listar-disciplinas.component.scss']
})
export class ListarDisciplinasComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'acoes'];
  dataSource = new MatTableDataSource<any>([]);
  disciplinaForm: FormGroup;
  idDisciplinaEditada: any;
  editMode = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private disciplinaService: DisciplinaService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.disciplinaForm = new FormGroup({
      nome: new FormControl('', Validators.required),
    });

    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.getRangeLabel = this.getRangeLabel;
    this.dataSource.paginator = this.paginator;

    this.getDisciplinas();
  }

  getDisciplinas() {
    this.disciplinaService.getList().subscribe(res => {
      this.dataSource.data = res;
    });
  }
  // Apenas sobrescreve o metodo para tradução de palavras
  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }

  // Metodo para editar uma disciplina
  onCliclEditarDisciplina(element) {
    this.editMode = true;
    this.idDisciplinaEditada = element._id;
    this.disciplinaForm.get('nome').setValue(element.nome);
  }

  onSubmitAdicionarDisciplina() {
    if (this.editMode) {
      this.disciplinaService.update(this.idDisciplinaEditada, this.disciplinaForm.value).subscribe(res => {
        this.toast.success('Disciplina editada com sucesso!', 'Disciplina');
        this.onClickClear(); 
      });
    } else {
      this.disciplinaService.insert(this.disciplinaForm.value).subscribe(res => {
        this.toast.success('Disciplina adicionada com sucesso!', 'Disciplina');
      });
    }
    this.getDisciplinas();
  }

  onClickClear() {
    this.editMode = false;
    this.disciplinaForm.reset();
  }
}
