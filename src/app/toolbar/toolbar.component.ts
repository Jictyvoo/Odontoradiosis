import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

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
