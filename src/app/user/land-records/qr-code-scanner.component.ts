import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

declare const Html5QrcodeScanner: any;

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html'
})
export class QrCodeScannerComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<QrCodeScannerComponent>) {}

  ngOnInit(): void {
    this.initQrCodeScanner();
  }

  private initQrCodeScanner(): void {
    const onScanSuccess = (decodeText: string, decodeResult: any): void => {
      this.dialogRef.close(decodeText); // Use arrow function to correctly bind 'this'
    };

    const htmlScanner = new Html5QrcodeScanner('my-qr-reader', { fps: 10, qrbos: 250 });
    htmlScanner.render(onScanSuccess);
  }
}
