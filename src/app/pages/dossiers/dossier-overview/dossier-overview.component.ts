import {Component, inject} from '@angular/core';
import {genericRoutes, pageRoutes} from '../../../common/routes/page-routes';
import {MatDialog} from '@angular/material/dialog';
import {qrShareDossierPrefix} from '../../../../configs/qr.config';
import {QrScanDialogComponent} from '../../../components/dialog/qr-scan-dialog/qr-scan-dialog.component';
import {TranslationService} from '../../../common/services/translation-service/translation.service';

@Component({
    selector: 'app-dossier-overview',
    templateUrl: './dossier-overview.component.html',
    styleUrl: './dossier-overview.component.scss',
})
export class DossierOverviewComponent {
    dossierOverviewCSSClass = 'dossier-overview';
    protected readonly pageRoutes = pageRoutes;
    protected readonly genericRoutes = genericRoutes;

    private readonly dialog = inject(MatDialog);
    constructor(private readonly translationService: TranslationService) {}

    openQRPopup() {
        this.dialog.open(QrScanDialogComponent, {
            data: {
                qrPrefix: qrShareDossierPrefix,
                callback: this.qrSuccessCallback,
                title: this.translationService.instant('i18n.inviteControl'),
            },
        });
    }

    private readonly qrSuccessCallback = (url: string) => {
        window.location.href = url;
    };
}
