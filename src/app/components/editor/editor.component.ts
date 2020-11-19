import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {EventEmitterService} from "../../services/event/event-emitter.service";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    htmlContent: any;
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '16',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        sanitize: true,
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        outline: true,
        toolbarHiddenButtons: [
            [],
            [
                'textColor',
                'backgroundColor',
                'insertVideo',
                'link',
                'unlink',
            ]
        ]
    };

    constructor() {
    }

    ngOnInit() {
    }

    keyup() {
        EventEmitterService.get('editorChange').emit(this.htmlContent);
    }
}
