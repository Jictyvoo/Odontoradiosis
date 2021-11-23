import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CephalometricCanvasService } from 'cephalometric-canvas';
import { ILoadedFile } from 'src/util/general';

@Component({
    selector: 'dropzone-dialog',
    template: `
        <app-file-dropzone
            (fileLoadedEvent)="onFileLoaded($event)"
            class="dialog-drop"
        ></app-file-dropzone>
    `,
    styles: [``],
})
export class DropzoneDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DropzoneDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { toEdit: boolean },
        private canvasService: CephalometricCanvasService
    ) {}

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onFileLoaded(event: ILoadedFile): void {
        this.canvasService.loadImage(event.content as string);
        this.dialogRef.close();
    }
}
