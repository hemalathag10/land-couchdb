import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare const Html5QrcodeScanner: any;

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styles: [`
    button#closeButton {
      padding: 10px 5px;
      background-color: grey; /* Change to your preferred button color */
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      margin-top: 20px; /* Add margin-top to create space between the scanner and the button */
    }

    button#closeButton:hover {
      background-color: black; /* Change to a slightly darker shade for hover effect */
    }
  `]
})
export class QrCodeScannerComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<QrCodeScannerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.initQrCodeScanner();
  }
  

  private initQrCodeScanner(): void {
    const onScanSuccess = (decodeText: string, decodeResult: any): void => {
      console.log(decodeText)
      console.log("data",this.data.barcodeControl)
      this.data.onScanSuccess(decodeText);
      this.stopCamera()


      };

    const htmlScanner = new Html5QrcodeScanner('my-qr-reader', { fps: 10, qrbos: 250 });
    htmlScanner.render(onScanSuccess);
    
  }

  stopCamera(): void {
    const videoElement = document.querySelector('video');
    if (videoElement instanceof HTMLVideoElement) {
      const stream = videoElement.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach(track => {
        track.stop();
      });

    }
  }

  closeScanner(): void {
    this.dialogRef.close();
  }
}
