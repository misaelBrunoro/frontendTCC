import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userEmail: FormControl;
  userPassword: FormControl;
  loginForm: FormGroup;
  isSendingLoginRequest = false;

  constructor(
      public authService: AuthService,
      public router: Router,
      public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.userEmail = new FormControl('', Validators.required);
    this.userPassword = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      userEmail: this.userEmail,
      userPassword: this.userPassword
    });
  }

  onSubmitLogin() {
    this.authService.loginEmail(this.userEmail.value, this.userPassword.value)
    .then((res) => {
      this.flashMessage.show('Usuario logado.', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/graficos']);
    }).catch((err) => {
      console.log(err);
      this.flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/login']);
    });
  }

  onClickGoogleLogin() {
    this.authService.loginGoogle()
        .then((res) => {
          console.log(res.user.providerData);
          this.flashMessage.show('Usuario logado.', {cssClass: 'alert-success', timeout: 4000});
          this.router.navigate(['/graficos']);
        }).catch((err) => {
          this.flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
          this.router.navigate(['/login']);
    });
  }

    onClickFacebookLogin() {
        this.authService.loginFacebook()
            .then((res) => {
                this.flashMessage.show('Usuario logado.', {cssClass: 'alert-success', timeout: 4000});
                this.router.navigate(['/graficos']);
            }).catch((err) => {
            this.flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
            this.router.navigate(['/login']);
        });
    }

    onClickTwitterLogin() {
        this.authService.loginTwitter()
            .then((res) => {
                this.flashMessage.show('Usuario logado.', {cssClass: 'alert-success', timeout: 4000});
                this.router.navigate(['/graficos']);
            }).catch((err) => {
            this.flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
            this.router.navigate(['/login']);
        });
    }
}
