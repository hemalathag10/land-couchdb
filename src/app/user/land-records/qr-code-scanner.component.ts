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
      this.data.onScanSuccess(decodeText); // Use the callback function to pass the value

    };

    const htmlScanner = new Html5QrcodeScanner('my-qr-reader', { fps: 10, qrbos: 250 });
    htmlScanner.render(onScanSuccess);
  }
  closeScanner(): void {
    this.dialogRef.close();
  }
}
// // qr-code-scanner.component.ts

// import { Component, OnInit, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// declare const Html5QrcodeScanner: any;

// @Component({
//   selector: 'app-qr-code-scanner',
//   templateUrl: './qr-code-scanner.component.html',
// })
// export class QrCodeScannerComponent implements OnInit {
//   private isCodeProcessed = false;
//   private htmlScanner: any;

//   constructor(
//     private dialogRef: MatDialogRef<QrCodeScannerComponent>,
//     @Inject(MAT_DIALOG_DATA) private data: any
//   ) {}

//   ngOnInit(): void {
//     this.initQrCodeScanner();
//   }

//   private initQrCodeScanner(): void {
//     const onScanSuccess = (decodeText: string, decodeResult: any): void => {
//       // Check if the scanned QR code is not empty and not processed yet
//       if (decodeText && !this.isCodeProcessed) {
//         // Set the scanned QR code to the form control
//         this.data.barcodeControl.setValue(decodeText);

//         // Display a confirmation message with the scanned QR code
//         console.log('Your QR Code is: ' + decodeText);

//         // Set the flag to true to indicate that the code has been processed
//         this.isCodeProcessed = true;

//         // Stop the scanner without closing the dialog
//         if (this.htmlScanner) {
//           this.htmlScanner.stop();
//         }

//         // Close the dialog
//         this.dialogRef.close();
//       }
//     };

//     this.htmlScanner = new Html5QrcodeScanner('my-qr-reader', { fps: 10, qrbos: 250 });
//     this.htmlScanner.render(onScanSuccess);
//   }
// }
