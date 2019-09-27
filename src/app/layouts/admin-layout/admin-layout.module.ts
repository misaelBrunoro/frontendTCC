import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { FiltrosComponent } from '../../components/filtros/filtros.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PerfilUserComponent } from '../../pages/perfil-user/perfil-user.component';
import { MuralComponent } from '../../pages/mural/mural.component';
import { AdminComponent } from '../../pages/admin/admin.component';
import { ChatComponent } from '../../pages/chat/chat.component';
import { PerguntaNovaComponent } from '../../components/pergunta/pergunta-nova/pergunta-nova.component';
import { ListarPerguntasComponent } from '../../components/pergunta/listar-perguntas/listar-perguntas.component';
import { DetalhesPerguntaComponent } from '../../components/pergunta/detalhes-pergunta/detalhes-pergunta.component';
import { ListarSalasComponent } from '../../components/salas/listar-salas/listar-salas.component';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatIconModule,
} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MaterialFileInputModule,
    NgxSpinnerModule
  ],
  declarations: [
    DashboardComponent,
    PerfilUserComponent,
    MuralComponent,
    AdminComponent,
    ChatComponent,
    FiltrosComponent,
    PerguntaNovaComponent,
    ListarPerguntasComponent,
    DetalhesPerguntaComponent,
    ListarSalasComponent
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  entryComponents: [
      PerguntaNovaComponent
  ],
})

export class AdminLayoutModule {}
