import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/services/sidenav.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    private toggleActive: boolean;

    constructor(private sidenav: SidenavService) {
        this.toggleActive = false;
    }

    ngOnInit(): void {}

    openSidebar(): void {
        this.toggleActive = !this.toggleActive;
        this.sidenav.toggle();
    }

    openImageSelection(): void {
        console.debug('Open image selection');
    }

    openWindowSave(): void {
        console.log('Open window save');
    }

    markSemiautomatic(): void {
        console.log('Mark semiautomatic');
    }

    exportImage(): void {
        console.log('Export image');
    }
}
