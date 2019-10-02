import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css']
})
export class MuralComponent implements OnInit {

  filtroTemporario;

  constructor(
      public route: Router
  ) { }

  ngOnInit() {
  }

  onClickNovaPergunta() {
    this.route.navigate(['mural/nova-pergunta']);
  }

  receiveFiltros(filtros) {
    this.filtroTemporario = filtros;
  }
}
