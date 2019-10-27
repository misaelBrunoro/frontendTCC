import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public option: boolean;
  public mensagem: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
    ) { }

  ngOnInit() {
  }

  onClickCancelar() {
    this.option = false;
    this.dialogRef.close();
  }

  onClickConfirmar() {
    this.option = true;
    this.dialogRef.close();
  }
}
