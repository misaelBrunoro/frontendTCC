import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
      public authService: AuthService,
      public router: Router,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmitLogin() {
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe(data => {
      localStorage.setItem('token', data['token']);
      this.toastr.success('Logado com sucesso', 'Login');
      this.spinner.hide();
      this.router.navigate(['/mural']);
    }, error => {
      this.toastr.error(error['error']['errors'], 'Login');
      this.spinner.hide();
    });
  }
}
