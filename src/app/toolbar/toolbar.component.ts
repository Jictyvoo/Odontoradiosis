import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CephalometricCanvasService } from 'cephalometric-canvas';
import { SidenavService } from '../../services/sidenav.service';
import { DropzoneDialogComponent } from '../dropzone/dropzone-dialog.component';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    private toggleActive: boolean;

    constructor(
        private sidenav: SidenavService,
        public dialog: MatDialog,
        private canvasService: CephalometricCanvasService
    ) {
        this.toggleActive = false;
    }

    ngOnInit(): void {}

    openSidebar(): void {
        this.toggleActive = !this.toggleActive;
        this.sidenav.toggle();
    }

    openImageSelection(): void {
        const dialogRef = this.dialog.open(DropzoneDialogComponent, {
            width: '80%',
            ariaDescribedBy: 'dropzone-dialog',
            ariaLabel: 'Dropzone dialog',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.debug('The dialog was closed', result);
        });
    }

    markSemiautomatic(): void {
        console.log('Mark semiautomatic');
    }

    /**
     * Method is use to download file.
     */
    exportImage(): void {
        // generate file as a blob
        const exportableData = this.canvasService.exportCephalometricData();
        const data = JSON.stringify(exportableData);
        const blob = new Blob([data], { type: 'text/json' });
        const url = window.URL.createObjectURL(blob);

        // download the file
        const tempElement = document.createElement('a');
        tempElement.href = url;
        tempElement.download = 'cephalometric-data.json';
        tempElement.click();
        window.URL.revokeObjectURL(url);
        tempElement.remove();

        // window.open(url, '_blank');
    }
}
