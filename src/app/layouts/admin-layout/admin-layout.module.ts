import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PerfilUserComponent } from '../../pages/perfil-user/perfil-user.component';
import { MuralComponent } from '../../pages/mural/mural.component';
import { AdminComponent } from '../../pages/admin/admin.component';
import { ChatComponent } from '../../pages/chat/chat.component';
import { ComponentsModule } from '../../components/components.module';
import { MaterialFormatModule } from '../../material/material-format.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialFormatModule
  ],
  declarations: [
    DashboardComponent,
    PerfilUserComponent,
    MuralComponent,
    AdminComponent,
    ChatComponent,
  ],
})

export class AdminLayoutModule {}
