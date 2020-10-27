import {Observable} from 'rxjs';
import {EventEmitterService} from './../../../services/event/event-emitter.service';
import {PerguntasSimilaresComponent} from './../perguntas-similares/perguntas-similares.component';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PerguntaService} from 'app/services/pergunta/pergunta.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {DisciplinaService} from 'app/services/disciplina/disciplina.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
    selector: 'app-pergunta-nova',
    templateUrl: './pergunta-nova.component.html',
    styleUrls: ['./pergunta-nova.component.scss']
})
export class PerguntaNovaComponent implements OnInit {
    perguntaForm: FormGroup;
    comboDisciplinas: any[];
    editMode: boolean;
    _id: any;

    constructor(
        private perguntaService: PerguntaService,
        private disciplinaService: DisciplinaService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private spinner: NgxSpinnerService,
        private router: Router,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.perguntaForm = new FormGroup({
            titulo: new FormControl('', Validators.required),
            descricao: new FormControl('', Validators.required),
            disciplina: new FormControl('', Validators.required)
        });

        this.loadComboDisciplina();

        this.route.params.subscribe(param => {
            this._id = param['id'];
            if (this._id !== 'nova') {
                this.detalhesPergunta();
            }
        });

        EventEmitterService.get('editorChange').subscribe(data => {
            this.perguntaForm.get('descricao').setValue(data);
            console.log(data);
        });
    }

    detalhesPergunta() {
        this.spinner.show();
        this.perguntaService.detalhes(this._id).subscribe(data => {
            this.perguntaForm.get('titulo').setValue(data[0].titulo);
            this.perguntaForm.get('descricao').setValue(data[0].descricao);
            this.perguntaForm.get('disciplina').setValue(data[0].disciplina._id);
            this.editMode = true;
            this.spinner.hide();
        });
    }

    loadComboDisciplina() {
        this.disciplinaService.getList().subscribe((data: any[]) => {
            this.comboDisciplinas = data;
        });
    }

    onSubmitEnviarPergunta() {
        let items: any = [];

        const filtroForm = {
            texto: this.perguntaForm.get('descricao').value,
            disciplina: this.perguntaForm.get('disciplina').value
        };

        if (!this.editMode) {
            this.perguntaService.filteredItems(1, filtroForm).subscribe(res => {
                items = res.pageOfItems;

                if (items.length > 0) {
                    const dialogRef = this.dialog.open(PerguntasSimilaresComponent, {
                        width: '550px',
                        height: '530px',
                    });
                    (dialogRef.componentInstance).items = items;
                    dialogRef.afterClosed().subscribe(result => {
                        if ((dialogRef.componentInstance).aceitar) {
                            this.concluirEnvio();
                        }
                    });
                } else {
                    this.concluirEnvio();
                }
            });
        } else {
            this.editarPergunta();
        }
    }

    concluirEnvio() {
        this.perguntaService.insert(this.perguntaForm.value).subscribe(data => {
            this.toastr.success('Pergunta enviada com sucesso', 'Pergunta');
            this.spinner.hide();
            this.router.navigate(['/mural']);
        }, error => {
            console.log(error);
            this.spinner.hide();
        });
    }

    editarPergunta() {
        this.perguntaService.update(this._id, this.perguntaForm.value).subscribe(data => {
            this.toastr.success('Pergunta enviada com sucesso', 'Pergunta');
            this.spinner.hide();
            this.router.navigate(['/mural']);
        }, error => {
            console.log(error);
            this.spinner.hide();
        });
    }
}

