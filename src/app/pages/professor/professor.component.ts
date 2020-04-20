import { Component, OnInit, ViewChild } from '@angular/core';
import { VincularDisciplinasComponent } from '../../components/disciplinas/vincular-disciplinas/vincular-disciplinas.component';
import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';
import { UserService } from './../../services/user/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {
  displayedColumns: string[] = ['nomeReal', 'email', 'tipo', 'acoes'];
  dataSource = new MatTableDataSource<any>([]);
  currentUser: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.userService.currentUser().then(res => {
      this.currentUser = res;
    }, error => {
      console.log(error);
    });

    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.getRangeLabel = this.getRangeLabel;
    this.dataSource.paginator = this.paginator;
    this.getAlunos( );
  }

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

  // Buscar alunos e monitores
  getAlunos( ) {
    this.userService.getList('Monitor').subscribe(monitor => {
      this.userService.getList('Aluno').subscribe(aluno => {
        this.dataSource.data = monitor.concat(aluno);
      });
    }, error => {
      console.log(error);
    });
  }

  // Abrir o dialog de vinculo de disciplinas
  onClickDisciplinas(user) {
    const dialogRef = this.dialog.open(VincularDisciplinasComponent, {
      width: '450px',
      height: '400px'
    });
    (dialogRef.componentInstance).userSelecionado = user;
    (dialogRef.componentInstance).contexto = 'Professor';
    this.getAlunos( );
  }

  // Esse método torna um aluno monitor ou aluno obs: Para tornar um monitor aluno, o monitor
  // tem que possuir uma das disciplinas do professor
  onClickMonitor(id, tipo) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      height: '153px',
    });
    if (tipo === 'Aluno') {
      (dialogRef.componentInstance).mensagem = 'Deseja remover permissão de monitor?'
    } else {
      (dialogRef.componentInstance).mensagem = 'Deseja adicionar permissão de monitor?'
    }

    dialogRef.afterClosed().subscribe(result => {
      if ((dialogRef.componentInstance).option) {
        if ( tipo === 'Aluno') {
          this.userService.getByID(id).subscribe(res => {
              const vector = res.disciplina.filter( el => {
                  return el._id === this.currentUser.disciplina._id;
              });
              if (vector.length > 0 || res.disciplina.length === 0) {
                this.userService.tornarMonitor(id, tipo).subscribe(res => {
                  this.toast.success('Esse aluno agora é um ' + tipo, 'Sucesso');
                  this.getAlunos( );
                });
              }
          });
        } else {
          this.userService.tornarMonitor(id, tipo).subscribe(res => {
            this.toast.success('Esse aluno agora é um ' + tipo, 'Sucesso');
            this.getAlunos( );
          });
        }
      }
    });
  }
}
