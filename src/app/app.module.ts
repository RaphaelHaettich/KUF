import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {QRCodeModule} from 'angularx-qrcode';
import {LOAD_WASM, NgxScannerQrcodeModule} from 'ngx-scanner-qrcode';
import {
    ObButtonModule,
    ObExternalLinkModule,
    ObIconModule,
    ObMasterLayoutConfig,
    ObMasterLayoutModule,
    ObSpinnerModule,
    multiTranslateLoader,
} from '@oblique/oblique';
import {DATE_FORMATS_MOMENT} from '../configs/date.config';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {registerLocaleData} from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import localeFRCH from '@angular/common/locales/fr-CH';
import localeITCH from '@angular/common/locales/it-CH';
import {AppRoutingModule} from './common/modules/app-routing.module';
import {DossierDetailComponent} from './pages/dossiers/dossier-detail/dossier-detail.component';
import {HeaderComponent} from './components/header/header.component';
import {DossierOverviewComponent} from './pages/dossiers/dossier-overview/dossier-overview.component';
import {DetailCardComponent} from './pages/dossiers/detail-card/detail-card.component';
import {DateFormatPipe} from './common/pipes/date-format.pipe';
import {DateTimeFormatPipe} from './common/pipes/date-time-format.pipe';
import {QrCodeDialogComponent} from './components/dialog/qr-code-dialog/qr-code-dialog.component';
import {QrScanDialogComponent} from './components/dialog/qr-scan-dialog/qr-scan-dialog.component';
import {BottomBarComponent} from './components/bottom-bar/bottom-bar.component';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import {BackButtonComponent} from './components/header/back-button/back-button.component';
import {genericRoutes, pageRoutes} from './common/routes/page-routes';
import {ControlStatusComponent} from './components/control-status/control-status.component';

registerLocaleData(localeDECH);
registerLocaleData(localeFRCH);
registerLocaleData(localeITCH);
LOAD_WASM().subscribe();

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DossierDetailComponent,
        DossierOverviewComponent,
        DetailCardComponent,
        DateFormatPipe,
        DateTimeFormatPipe,
        QrCodeDialogComponent,
        QrScanDialogComponent,
        BottomBarComponent,
        BackButtonComponent,
        ControlStatusComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        BrowserModule,
        ObMasterLayoutModule,
        BrowserAnimationsModule,
        QRCodeModule,
        ObButtonModule,
        ObIconModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot(multiTranslateLoader()),
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        ObExternalLinkModule,
        NgOptimizedImage,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatToolbarModule,
        MatExpansionModule,
        MatDialogTitle,
        NgxScannerQrcodeModule,
        ObSpinnerModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: LOCALE_ID, useValue: 'de-CH'},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
        provideMomentDateAdapter(DATE_FORMATS_MOMENT),
    ],
})
export class AppModule {
    constructor(config: ObMasterLayoutConfig) {
        config.locale.locales = ['de-CH', 'fr-CH', 'it-CH'];
        config.locale.display = false;
        config.header.reduceOnScroll = false;
        config.layout.hasLayout = false;
        config.layout.hasMainNavigation = false;
        config.homePageRoute = `${pageRoutes.dossier}/${genericRoutes.overview}`;
    }
}
