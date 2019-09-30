import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css']
})
export class MuralComponent implements OnInit {

  constructor(
      public route: Router
  ) { }

  ngOnInit() {
  }

  onClickNovaPergunta() {
    this.route.navigate(['mural/nova-pergunta']);
  }
}
