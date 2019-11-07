import { Component,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  newSupplier:string;
  newCity: string; 
  newReference:string; 
}

@Component({
    selector: 'dialog-content-example-dialog',
    styleUrls: ['supplier-list.component.css'],
    templateUrl: 'popup.html',
  })
  export class DialogContentExampleDialog {
    constructor(
      public dialogRef: MatDialogRef<DialogContentExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick() {
      console.log("Goodbye");
      this.dialogRef.close();
    }

  }
