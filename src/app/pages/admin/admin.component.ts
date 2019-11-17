import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['nomeReal', 'nomeVirtual', 'email', 'situacao', 'acoes'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.getRangeLabel = this.getRangeLabel;
    this.dataSource.paginator = this.paginator;
    this.getProfessores();
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

  getProfessores() {
    this.userService.getList('Professor').subscribe(res => {
      console.log(res);
      this.dataSource.data = res;
    }, error => {
      console.log(error);
    })
  }

  onClickAtivar(ativo) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      height: '130px',
    });
    if (ativo === false) {
      (dialogRef.componentInstance).mensagem = 'Deseja desativar este professor?'
    } else {
      (dialogRef.componentInstance).mensagem = 'Deseja ativar este professor?'
    }

    dialogRef.afterClosed().subscribe(result => {
      if ((dialogRef.componentInstance).option) {
        console.log(ativo);
      }
    });
  }
}
