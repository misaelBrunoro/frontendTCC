import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perguntas-similares',
  templateUrl: './perguntas-similares.component.html',
  styleUrls: ['./perguntas-similares.component.scss']
})
export class PerguntasSimilaresComponent implements OnInit {
  continuar: boolean;
  items: any;
  aceitar: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PerguntasSimilaresComponent>,
    private router: Router
  ) { }

  ngOnInit() {}

  aceitarPostar() {
    this.aceitar = true;
    this.dialogRef.close();
  }

  tratarDescricao(text: any) {
    let texto = Array.from(text);
    if (texto.length > 50) {
      return texto.splice(50, texto.length).join("") + "...";
    } else {
      return text;  
    }
  }

  navigateRoute(id: any) {
    this.router.navigate(['/mural/detalhe-pergunta/'+ id]);
    this.dialogRef.close();
  }
}
