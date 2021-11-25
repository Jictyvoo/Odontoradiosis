import { Component, OnInit } from '@angular/core';
import { CephalometricCanvasService } from 'cephalometric-canvas';
import { DataExporterRepository } from '../../services/data-exporter.repository';
import { globalLoadFile } from '../../util/file-loader';
import { ILoadedFile } from '../../util/general';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private canvasService: CephalometricCanvasService,
        private dataExporterRepository: DataExporterRepository
    ) {}

    ngOnInit(): void {}

    get hasRadiographyLoaded(): boolean {
        return this.canvasService.isImageOpened;
    }

    async onFileLoaded(event: ILoadedFile): Promise<void> {
        await globalLoadFile(
            event,
            this.canvasService,
            this.dataExporterRepository
        );
    }
}
