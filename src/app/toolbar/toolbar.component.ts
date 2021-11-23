import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from '../../services/sidenav.service';
import { DropzoneDialogComponent } from '../dropzone/dropzone-dialog.component';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    private toggleActive: boolean;

    constructor(private sidenav: SidenavService, public dialog: MatDialog) {
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

    exportImage(): void {
        console.log('Export image');
    }
}
