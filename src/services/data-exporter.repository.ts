import { Injectable } from '@angular/core';
import { IExportableData } from 'cephalometric-canvas';
import JSZip from 'jszip';

@Injectable({
    providedIn: 'root',
})
export class DataExporterRepository {
    private static readonly jsonFilename = 'cephalometric-data.json';

    constructor() {}

    async importData(data: any): Promise<IExportableData | null> {
        // download the file
        const zip = new JSZip();
        const loadedZip = await zip.loadAsync(data);
        if (loadedZip) {
            const file = loadedZip.file(DataExporterRepository.jsonFilename);
            if (file) {
                const stringFile = await file.async('string');
                const json = JSON.parse(stringFile);
                return json;
            }
        }
        return null;
    }

    /**
     * Method is use to download file.
     */
    async exportData(data: any): Promise<void> {
        // download the file
        const zip = new JSZip();
        zip.file(DataExporterRepository.jsonFilename, data);
        const zipContent = await zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 9 },
        });
        const url = window.URL.createObjectURL(zipContent);
        const tempElement = document.createElement('a');
        tempElement.href = url;
        tempElement.download = 'cephalometric-data.zip';
        tempElement.click();
        window.URL.revokeObjectURL(url);
        tempElement.remove();
    }
}
