import { Component, OnInit } from '@angular/core';
import { CephalometricCanvasService } from 'cephalometric-canvas';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private canvasService: CephalometricCanvasService) {}

    ngOnInit(): void {}

    get hasRadiographyLoaded(): boolean {
        return true;
    }

    selectFile(): void {
        console.log('TODO');
    }
}
