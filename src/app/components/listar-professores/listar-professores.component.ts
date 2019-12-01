import { FormGroup, FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { VincularDisciplinasComponent } from '../disciplinas/vincular-disciplinas/vincular-disciplinas.component';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-professores',
  templateUrl: './listar-professores.component.html',
  styleUrls: ['./listar-professores.component.scss']
})
export class ListarProfessoresComponent implements OnInit {
  displayedColumns: string[] = ['nomeReal', 'email', 'situacao', 'acoes'];
  dataSource = new MatTableDataSource<any>([]);
  buscaForm: FormGroup;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.buscaForm = new FormGroup({
      texto: new FormControl(''),
      tipo: new FormControl('Professor')
    });

    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.getRangeLabel = this.getRangeLabel;
    this.dataSource.paginator = this.paginator;
    this.getProfessores( );
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

  getProfessores( ) {
    this.userService.getList('Professor').subscribe(res => {
      this.dataSource.data = res;
    });
  }

  onClickAtivar(ativo, id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      height: '153px',
    });
    if (ativo === 'Inativo') {
      (dialogRef.componentInstance).mensagem = 'Deseja mesmo desativar este professor?'
    } else {
      (dialogRef.componentInstance).mensagem = 'Deseja mesmo ativar este professor?'
    }

    dialogRef.afterClosed().subscribe(result => {
      if ((dialogRef.componentInstance).option) {
        this.userService.ativarUser(ativo, id).subscribe(res => {
          if (ativo === 'Ativo') {
            this.toast.success('Usuário ativado com sucesso', 'Ativação');
          } else {
            this.toast.success('Usuário desativado com sucesso', 'Ativação');
          }
          this.getProfessores( );
        }, error => {
            console.log(error);
        })
      }
    });
  }

  onClickDisciplinas(user) {
    const dialogRef = this.dialog.open(VincularDisciplinasComponent, {
      width: '450px',
      height: '400px'
    });
    (dialogRef.componentInstance).userSelecionado = user;
    (dialogRef.componentInstance).contexto = 'Admin';
  }

  onSubmitRealizarBusca() {
    if (this.buscaForm.get('texto').value) {
      this.userService.getFilteredList(this.buscaForm.value).subscribe(res => {
        this.toast.warning('Professores buscados: ' + res.length, 'Busca');
        this.dataSource = res;
      });
    } else {
      this.getProfessores();
    }
  }
}
