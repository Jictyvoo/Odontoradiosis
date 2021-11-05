import { Component, OnInit } from '@angular/core';
import { CephalometricCanvasService } from '../../cephalometric-canvas.service';

@Component({
    selector: 'lib-cephalometric-canvas',
    templateUrl: './cephalometric-canvas.component.html',
    styleUrls: ['./cephalometric-canvas.component.scss'],
})
export class CephalometricCanvasComponent implements OnInit {
    constructor(private canvasService: CephalometricCanvasService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.canvasService.init();
    }
}
