import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CephalometricCanvasService } from 'cephalometric-canvas';
import { DataExporterRepository } from '../../services/data-exporter.repository';
import { globalLoadFile } from '../../util/file-loader';
import { ILoadedFile } from '../../util/general';

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
        private canvasService: CephalometricCanvasService,
        private dataExporterRepository: DataExporterRepository
    ) {}

    onCancelClick(): void {
        this.dialogRef.close();
    }

    async onFileLoaded(event: ILoadedFile): Promise<void> {
        const loaded = await globalLoadFile(
            event,
            this.canvasService,
            this.dataExporterRepository
        );
        if (loaded) {
            this.dialogRef.close();
        }
    }
}
