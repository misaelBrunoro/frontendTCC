import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registroForm:    FormGroup;
  isSendingRequest = false;

  constructor(
      public authService: AuthService,
      public router: Router,
      private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registroForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      nomeVirtual: new FormControl('', Validators.required),
      nomeReal: new FormControl('', Validators.required)
    });
  }

  onSubmitAddUser() {
    this.isSendingRequest = true;
    this.authService.register(this.registroForm.value).subscribe(data => {
      this.toastr.success('Registrado com sucesso', 'Registro');
      this.isSendingRequest = false;
    }, error => {
      this.toastr.error('ERRO:' + error, 'Registro');
    });
  }
}
