export type QrScanData = {
    qrPrefix: string;
    title: string;
    callback: (result: string) => unknown;
};
