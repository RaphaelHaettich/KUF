import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {QrShowData} from './qr-code-dialog.types';

@Component({
    selector: 'app-qr-code-dialog',
    templateUrl: './qr-code-dialog.component.html',
    styleUrl: './qr-code-dialog.component.scss',
})
export class QrCodeDialogComponent {
    componentName = 'qr-code-dialog';
    readonly data = inject<QrShowData>(MAT_DIALOG_DATA);
    private readonly dialog = inject(MatDialog);

    public closeDialog() {
        this.dialog.closeAll();
    }
}
