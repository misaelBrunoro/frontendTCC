import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PerguntaNovaComponent } from '../../components/pergunta/pergunta-nova/pergunta-nova.component';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css']
})
export class MuralComponent implements OnInit {

  constructor(
      public dialog: MatDialog,
      public route: Router
  ) { }

  ngOnInit() {
  }

  onClickNovaPergunta() {
    this.route.navigate(['mural/nova-pergunta']);
  }
}
