import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PerfilUserComponent } from '../../pages/perfil-user/perfil-user.component';
import { MuralComponent } from '../../pages/mural/mural.component';
import { AdminComponent } from '../../pages/admin/admin.component';
import { IconsComponent } from '../../pages/icons/icons.component';

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
} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';

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
  ],
  declarations: [
    DashboardComponent,
    PerfilUserComponent,
    MuralComponent,
    AdminComponent,
    IconsComponent,
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
    ]
})

export class AdminLayoutModule {}
