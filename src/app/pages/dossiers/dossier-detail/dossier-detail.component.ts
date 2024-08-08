import {Component, inject} from '@angular/core';
import {QrCodeDialogComponent} from '../../../components/dialog/qr-code-dialog/qr-code-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TranslationService} from '../../../common/services/translation-service/translation.service';
import {qrShareDossierPrefix} from '../../../../configs/qr.config';
import {states} from '../../../../configs/control.config';

@Component({
    selector: 'app-dossier-overview',
    templateUrl: './dossier-detail.component.html',
    styleUrl: './dossier-detail.component.scss',
})
export class DossierDetailComponent {
    componentName = 'dossier-detail';
    states = states;
    controlTime = Date.now();

    private readonly dialog = inject(MatDialog);

    constructor(private readonly translationService: TranslationService) {}

    qrClicked() {
        this.dialog.open(QrCodeDialogComponent, {
            data: {
                title: this.translationService.instant('i18n.shareControl'),
                subTitle: 'Example ID',
                qrString: `${qrShareDossierPrefix}${window.location.pathname}`,
            },
        });
    }
}
