import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent implements OnInit {
  currentUser: any;
  perfilForm: FormGroup;

  constructor(
    private userService: UserService,
    public router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.perfilForm = new FormGroup({
      nomeReal: new FormControl(''),
      nomeVirtual: new FormControl(''),
      email: new FormControl(''),
      senhaAtual: new FormControl(''),
      novaSenha: new FormControl(''),
      repetirNovaSenha: new FormControl(''),
    });

    this.userService.currentUser().then(data => {
      this.currentUser = data;
      this.perfilForm.get('nomeReal').setValue(data.nomeReal);
      this.perfilForm.get('nomeVirtual').setValue(data.nomeVirtual);
      this.perfilForm.get('email').setValue(data.email);
    });
  }

  onSubmitPerfil() {
    this.spinner.show();
    this.userService.alterarPerfil(this.perfilForm.value).subscribe(data => {
      this.toastr.success('Perfil alterado com sucesso', 'Alteração');
      this.spinner.hide();
    }, error => {
      this.toastr.error(error.error.errors, 'Alteração');
      this.spinner.hide();
    });
  }
}
