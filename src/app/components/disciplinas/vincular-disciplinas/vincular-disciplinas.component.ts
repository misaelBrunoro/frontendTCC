import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { DisciplinaService } from 'app/services/disciplina/disciplina.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vincular-disciplinas',
  templateUrl: './vincular-disciplinas.component.html',
  styleUrls: ['./vincular-disciplinas.component.scss']
})
export class VincularDisciplinasComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'acoes'];
  dataSource = new MatTableDataSource<any>([]);
  userSelecionado: any;
  currentUser: any;
  contexto: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private disciplinaService: DisciplinaService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.getRangeLabel = this.getRangeLabel;
    this.dataSource.paginator = this.paginator;

    this.userService.currentUser().then(res => {
      this.currentUser = res;
      this.getDisciplinas( );
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

  // Buscar disciplinas no servidor, componente genério que busca de acordo com o contexto
  getDisciplinas( ) {
    if (this.contexto === 'Professor') {
      this.dataSource.data = this.currentUser.disciplina;
      this.renovarUser();
    } else if (this.contexto === 'Admin') {
      this.disciplinaService.getList().subscribe(res => {
        this.dataSource.data = res;
        this.renovarUser();
      });
    }
  }

  // Verifica se usuario selecionado tem uma disciplina vinculada
  temDisciplina(disciplina) {
    const vector = this.userSelecionado.disciplina.filter( el => {
      return el === disciplina;
    });
    if (vector.length > 0) {
      return true;
    }
    return false;
  }

  // Busca usuario novamente após o vinculo
  renovarUser() {
    this.userService.getByID(this.userSelecionado._id).subscribe(res => {
      this.userSelecionado = res;
    });
  }

  // Vincula a disciplina selcionada ao usuario
  vincularDisciplina(disciplina, vincular) {
    this.userService.vincularDisciplina(disciplina, vincular, this.userSelecionado._id).subscribe(res => {
      if (vincular === 'Adicionar') {
        this.toast.success('Disciplina vinculada', 'Disciplina');
      } else {
        this.toast.success('Disciplina desvinculada', 'Disciplina');
      }
      this.getDisciplinas();
    });
  }
}
