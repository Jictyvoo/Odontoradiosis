import { Component, OnInit } from '@angular/core';
import { CephalometricCanvasService } from 'cephalometric-canvas';
import { ILoadedFile } from 'src/util/general';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private canvasService: CephalometricCanvasService) {}

    ngOnInit(): void {}

    get hasRadiographyLoaded(): boolean {
        return this.canvasService.isImageOpened;
    }

    onFileLoaded(event: ILoadedFile): void {
        this.canvasService.loadImage(event.content as string);
    }
}
