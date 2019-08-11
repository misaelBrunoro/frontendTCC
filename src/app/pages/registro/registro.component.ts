import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  userEmail: FormControl;
  userPassword: FormControl;
  loginForm: FormGroup;
  isSendingLoginRequest = false;

  constructor(
      public loginService: AuthService,
      public router: Router
  ) { }

  ngOnInit() {
    this.userEmail = new FormControl('', Validators.required);
    this.userPassword = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      userEmail: this.userEmail,
      userPassword: this.userPassword
    });
  }

  onSubmitAddUser() {
      this.loginService.registerUser(this.userEmail.value, this.userPassword.value)
      .then ( (res) => {
          this.router.navigate(['/graficos']);
      }).catch ((err) => {
          console.log(err);
      });
  }
}
