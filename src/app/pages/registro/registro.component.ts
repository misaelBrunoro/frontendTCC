import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registroForm:    FormGroup;

  constructor(
      public authService: AuthService,
      public router: Router,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.registroForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      nomeVirtual: new FormControl('', Validators.required),
      nomeReal: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required)
    });
  }

  onSubmitAddUser() {
    this.spinner.show();
    this.authService.register(this.registroForm.value).subscribe(data => {
      this.toastr.success('Registrado com sucesso', 'Registro');
      this.spinner.hide();
      localStorage.setItem('token', data.token);
      this.router.navigate(['/dashboard']);
    }, error => {
      this.toastr.error(error['error']['errors'], 'Registro');
      this.spinner.hide();
    });
  }
}
