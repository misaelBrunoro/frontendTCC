import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment} from '../environments/environment';
import { AuthGuard} from './guards/auth.guard';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthService} from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

@NgModule({
  imports: [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      ComponentsModule,
      RouterModule,
      AppRoutingModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
      MatIconModule,
      FlexLayoutModule,
      MatProgressSpinnerModule,
      AngularFireAuthModule,
      AngularFireModule.initializeApp( environment.firebase),
  ],
  declarations: [
      AppComponent,
      AdminLayoutComponent,
      LoginComponent,
      RegistroComponent
  ],
  providers: [
      AuthService,
      AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
