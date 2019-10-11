import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resposta-nova',
  templateUrl: './resposta-nova.component.html',
  styleUrls: ['./resposta-nova.component.scss']
})
export class RespostaNovaComponent implements OnInit {
  widthDialog: any;
  heightDialog: any;

  constructor( ) { }

  ngOnInit() {
    this.calcularTamanho();
  }

  calcularTamanho() {
    console.log(this.heightDialog);
    console.log(this.widthDialog);
  }
}
