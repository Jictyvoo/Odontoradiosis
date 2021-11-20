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
        // FIXME: this is a hack to make the template work
        // Currently, when no image is loaded, the canvas element is not loaded also, so mainController doesn't exist
        // return this.canvasService.isImageOpened
        return true;
    }

    onFileLoaded(event: ILoadedFile): void {
        this.canvasService.openImage(event.content as string);
    }
}
