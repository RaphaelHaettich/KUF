import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {QrScanDialogComponent} from './qr-scan-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {ObSpinnerModule, multiTranslateLoader} from '@oblique/oblique';
import {NgxScannerQrcodeComponent, ScannerQRCodeResult} from 'ngx-scanner-qrcode';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MockBuilder} from 'ng-mocks';
import {AsyncSubject} from 'rxjs';

describe('QrScanDialogComponent', () => {
    let component: QrScanDialogComponent;
    let fixture: ComponentFixture<QrScanDialogComponent>;
    const callback = jest.fn();
    const qrPrefix = 'qrPrefix';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QrScanDialogComponent, NgxScannerQrcodeComponent],
            imports: [
                TranslateModule.forRoot(multiTranslateLoader()),
                HttpClientModule,
                ObSpinnerModule,
                BrowserAnimationsModule,
            ],
            providers: [
                MatDialog,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        qrPrefix,
                        title: 'title',
                        callback,
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => MockBuilder(QrScanDialogComponent, class {}));

    beforeEach(() => {
        jest.clearAllMocks();
        fixture = TestBed.createComponent(QrScanDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should test the scanning and component rendering correctly', () => {
        const isReadySubscribeSpy = jest.spyOn(component.action.isReady, 'subscribe');
        const stopSpy = jest.spyOn(component.action, 'stop');
        const dataSpy = jest.spyOn(component.action.data, 'subscribe');
        const spinnerDeactivateSpy = jest.spyOn(component.spinnerService, 'deactivate');
        const errorNotificationSpy = jest.spyOn(component.obNotificationService, 'error');
        const playDeviceSpy = jest
            .spyOn(component.action, 'playDevice')
            .mockReturnValue(new AsyncSubject<null>());
        const startSpy = jest
            .spyOn(component.action, 'start')
            .mockReturnValue(new AsyncSubject<null>());
        const startSubscribeSpy = jest.spyOn(component.action.start(), 'subscribe');

        component.ngAfterViewInit();

        isReadySubscribeSpy.mock.calls?.[0][0]?.(true);
        startSpy.mock.calls?.[1][0]?.([{deviceId: 'deviceId', label: 'backlabel'}]);
        startSubscribeSpy.mock.calls?.[0][0]?.(true);
        startSubscribeSpy.mock.calls?.[0][1]?.(true);
        dataSpy.mock.calls?.[0][0]?.([{value: `${qrPrefix}/url`} as ScannerQRCodeResult]);

        expect(playDeviceSpy.mock.calls).toMatchSnapshot();
        expect(spinnerDeactivateSpy.mock.calls).toMatchSnapshot();
        expect(errorNotificationSpy.mock.calls).toMatchSnapshot();
        expect(callback.mock.calls).toMatchSnapshot();
        expect(stopSpy).toHaveBeenCalled();
        expect(fixture).toMatchSnapshot();
    });

    it('should stop the action and close the dialog on closeDialog()', () => {
        const actionSpy = jest.spyOn(component.action, 'stop');
        const dialogSpy = jest.spyOn(component.dialog, 'closeAll');

        component.closeDialog();

        expect(actionSpy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalled();
    });
});
