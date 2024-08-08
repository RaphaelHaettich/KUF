import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {QrCodeDialogComponent} from './qr-code-dialog.component';
import {QRCodeModule} from 'angularx-qrcode';
import {TranslateModule} from '@ngx-translate/core';
import {multiTranslateLoader} from '@oblique/oblique';
import {HttpClientModule} from '@angular/common/http';

describe('QrCodeDialogComponent', () => {
    let component: QrCodeDialogComponent;
    let fixture: ComponentFixture<QrCodeDialogComponent>;
    let dialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QrCodeDialogComponent],
            imports: [
                MatDialogModule,
                QRCodeModule,
                TranslateModule.forRoot(multiTranslateLoader()),
                HttpClientModule,
            ],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        qrString: 'qrString',
                        title: 'title',
                        subTitle: 'subTitle',
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QrCodeDialogComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(fixture).toMatchSnapshot();
    });

    it('should close the dialog', () => {
        jest.spyOn(dialog, 'closeAll');
        component.closeDialog();
        expect(dialog.closeAll).toHaveBeenCalled();
    });
});
