import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material';
import { PerguntaNovaComponent } from '../../components/dialog/pergunta-nova/pergunta-nova.component';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css']
})
export class MuralComponent implements OnInit {
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
      public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onClickNovaPergunta() {
    const dialogRef = this.dialog.open(PerguntaNovaComponent, {
        width:  '70%',
        height: '90%'
    });
  }
}
