import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

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
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      height: '180px',
    });
    (dialogRef.componentInstance).mensagem = 'Está ação requer que você faça um novo login, quer continuar?';

    dialogRef.afterClosed().subscribe(result => {
      if ((dialogRef.componentInstance).option) {
        if (this.validacoes()) {
          this.spinner.show();
          this.userService.alterarPerfil(this.perfilForm.value).subscribe(data => {
            this.toastr.success('Perfil alterado com sucesso', 'Alteração');
            this.spinner.hide();
            localStorage.clear();
            this.router.navigate(['/login']);
          }, error => {
            this.toastr.error(error.error.errors, 'Alteração');
            this.spinner.hide();
          });
        }
      }
    });
  }

  validacoes() {
    if (this.perfilForm.get('novaSenha').value !== this.perfilForm.get('repetirNovaSenha').value) {
      this.toastr.error('As senhas não conferem!', 'Alteração');
      return false;
    }
    if ((this.perfilForm.get('novaSenha').value || this.perfilForm.get('repetirNovaSenha').value)
      && !this.perfilForm.get('senhaAtual').value) {
      this.toastr.error('Você deve digitar sua senha atual!', 'Alteração');
      return false;
    }
    return true;
  }
}
