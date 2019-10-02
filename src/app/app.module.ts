import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AuthGuard} from './guards/auth.guard';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';

import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthService} from './services/auth//auth.service';
import { PerguntaService } from './services/pergunta/pergunta.service';
import { UserService } from './services/user/user.service';
import { UploadFilesService } from './services/upload/upload-file.service';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

@NgModule({
  imports: [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      HttpClientModule,
      ComponentsModule,
      RouterModule,
      AppRoutingModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
      MatIconModule,
      FlexLayoutModule,
      NgxSpinnerModule,
      ToastrModule.forRoot(),
  ],
  declarations: [
      AppComponent,
      AdminLayoutComponent,
      LoginComponent,
      RegistroComponent,
  ],
  providers: [
      PerguntaService,
      UploadFilesService,
      UserService,
      AuthService,
      AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
