import { Interceptor } from './services/auth/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthGuard} from './guards/auth.guard';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { MaterialFormatModule } from './material/material-format.module';

import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthService} from './services/auth//auth.service';
import { UserService } from './services/user/user.service';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { HttpClientModule } from '@angular/common/http'

@NgModule({
  imports: [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      Interceptor,
      HttpClientModule,
      ComponentsModule,
      RouterModule,
      AppRoutingModule,
      MaterialFormatModule,
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
      UserService,
      AuthService,
      AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
