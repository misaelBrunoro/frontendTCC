import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user/user.service';
import { Usuario } from '../../entities/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  userEmail:    FormControl;
  userPassword: FormControl;
  nomeVirtual:  FormControl;
  loginForm:    FormGroup;
  isSendingLoginRequest = false;
  objectUser: Usuario;

  constructor(
      public userService: UserService,
      public loginService: AuthService,
      public router: Router,
      public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.userEmail = new FormControl('', Validators.required);
    this.userPassword = new FormControl('', Validators.required);
    this.nomeVirtual = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      userEmail: this.userEmail,
      userPassword: this.userPassword,
      nomeVirtual: this.nomeVirtual,
    });

    this.objectUser = new Usuario();
  }

  onSubmitAddUser() {
      this.loginService.registerUser(this.userEmail.value, this.userPassword.value)
      .then ( (res) => {
          this.objectUser.nomeVirtual = this.nomeVirtual.value;
          this.flashMessage.show('Usuario cadastrado.', {cssClass: 'alert-success', timeout: 4000});
          this.router.navigate(['/graficos']);
      }).catch ((err) => {
          this.flashMessage.show(err.message, {cssClass: 'alert-danger', timeout: 4000});
      });
  }
}
