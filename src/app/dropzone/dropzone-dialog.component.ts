import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dropzone-dialog',
    template: ` <app-file-dropzone class="dialog-drop"></app-file-dropzone> `,
    styles: [``],
})
export class DropzoneDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DropzoneDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { toEdit: boolean }
    ) {}

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
