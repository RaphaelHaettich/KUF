import {AfterViewInit, Component, OnDestroy, ViewChild, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {NgxScannerQrcodeComponent, ScannerQRCodeDevice} from 'ngx-scanner-qrcode';
import {QrScanData} from './qr-scan-dialog.types';
import {SubSink} from 'subsink';
import {ObNotificationService, ObSpinnerService} from '@oblique/oblique';

@Component({
    selector: 'app-qr-scan-dialog',
    templateUrl: './qr-scan-dialog.component.html',
    styleUrl: './qr-scan-dialog.component.scss',
})
export class QrScanDialogComponent implements AfterViewInit, OnDestroy {
    readonly componentName = 'qr-scan-dialog';
    readonly spinnerChannel = 'qrScanDialogSpinner';
    readonly data = inject<QrScanData>(MAT_DIALOG_DATA);
    readonly spinnerService = inject(ObSpinnerService);
    readonly obNotificationService = inject(ObNotificationService);
    readonly dialog = inject(MatDialog);
    @ViewChild('action') action!: NgxScannerQrcodeComponent;
    private readonly subSink = new SubSink();

    ngOnDestroy() {
        this.subSink.unsubscribe();
        this.spinnerService.forceDeactivate(this.spinnerChannel);
    }

    ngAfterViewInit(): void {
        this.spinnerService.activate(this.spinnerChannel);
        this.action.isReady.subscribe(() => {
            const playDeviceFacingBack = (devices: ScannerQRCodeDevice[]) => {
                const device = devices.find((device: ScannerQRCodeDevice) =>
                    /back|rear|environment/gi.test(device.label),
                );

                this.action.playDevice(device ? device.deviceId : devices[0].deviceId);
            };
            this.subSink.sink = this.action.start(playDeviceFacingBack).subscribe(
                () => {
                    this.spinnerService.deactivate(this.spinnerChannel);
                },
                () => {
                    this.obNotificationService.error({
                        message: 'Kamera konnte gestartet werden',
                    });
                    this.spinnerService.deactivate(this.spinnerChannel);
                },
            );
            this.subSink.sink = this.action.data.subscribe((result) => {
                const qrValue = result?.[0]?.value;
                if (!qrValue || !qrValue.startsWith(this.data.qrPrefix)) {
                    return;
                }
                this.action.stop();
                this.data.callback(qrValue.replace(this.data.qrPrefix, ''));
            });
        });
    }

    public closeDialog() {
        this.action.stop();
        this.dialog.closeAll();
    }
}
