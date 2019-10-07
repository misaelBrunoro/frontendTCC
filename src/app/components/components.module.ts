import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PerguntaNovaComponent } from '.././components/pergunta/pergunta-nova/pergunta-nova.component';
import { ListarPerguntasComponent } from '.././components/pergunta/listar-perguntas/listar-perguntas.component';
import { DetalhesPerguntaComponent } from '.././components/pergunta/detalhes-pergunta/detalhes-pergunta.component';
import { ListarSalasComponent } from '.././components/salas/listar-salas/listar-salas.component';
import { FiltrosComponent } from '.././components/filtros/filtros.component';
import { MaterialFormatModule } from '../material/material-format.module';
import { ListarRespostasComponent } from './listar-respostas/listar-respostas.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialFormatModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FiltrosComponent,
    PerguntaNovaComponent,
    ListarPerguntasComponent,
    DetalhesPerguntaComponent,
    ListarSalasComponent,
    FiltrosComponent,
    ListarRespostasComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FiltrosComponent,
    PerguntaNovaComponent,
    ListarPerguntasComponent,
    DetalhesPerguntaComponent,
    ListarSalasComponent,
    FiltrosComponent
  ],
  providers: [
    MaterialFormatModule
  ]
})
export class ComponentsModule { }
