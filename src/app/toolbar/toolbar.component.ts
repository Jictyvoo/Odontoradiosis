import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CephalometricCanvasService } from 'cephalometric-canvas';
import { DataExporterRepository } from '../../services/data-exporter.repository';
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
        private canvasService: CephalometricCanvasService,
        private dataExporterRepository: DataExporterRepository
    ) {
        this.toggleActive = false;
    }

    ngOnInit(): void {
    }

    openSidebar(): void {
        this.toggleActive = !this.toggleActive;
        this.sidenav.toggle();
    }

    openImageSelection(): void {
        const dialogRef = this.dialog.open(DropzoneDialogComponent, {
            width: '80%',
            maxWidth: '800px',
            minHeight: '360px',
            maxHeight: '40%',
            ariaDescribedBy: 'dropzone-dialog',
            ariaLabel: 'Dropzone dialog',
            panelClass: 'dropzone_component_panel',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.debug('The dialog was closed', result);
        });
    }

    markSemiautomatic(): void {
        this.canvasService.markSemiautomatic();
    }

    /**
     * Method is use to download file.
     */
    async exportCephalometricData(): Promise<void> {
        // generate file as a blob
        const exportableData = this.canvasService.exportCephalometricData();
        const data = JSON.stringify(exportableData);

        // download the file
        this.dataExporterRepository.exportData(data);
    }
}
