import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PerguntaNovaComponent } from '../../components/dialog/pergunta-nova/pergunta-nova.component';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css']
})
export class MuralComponent implements OnInit {

  constructor(
      public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onClickNovaPergunta() {
    const dialogRef = this.dialog.open(PerguntaNovaComponent, {
        width:  '700px',
        height: '500px',
        panelClass: 'dialog-class'
    });
  }
}
