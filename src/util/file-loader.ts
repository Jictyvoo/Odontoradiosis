import { CephalometricCanvasService } from 'cephalometric-canvas';
import { DataExporterRepository } from '../services/data-exporter.repository';
import { AcceptedFileType, ILoadedFile } from './general';

export async function globalLoadFile(
    file: ILoadedFile,
    cephalometricService: CephalometricCanvasService,
    importerRepository: DataExporterRepository
): Promise<boolean> {
    if (file.fileType == AcceptedFileType.IMAGE) {
        cephalometricService.loadImage(file.content as string);
        return true;
    } else {
        const cephalometricData = await importerRepository.importData(
            file.content
        );
        if (cephalometricData) {
            cephalometricService.loadExportedData(cephalometricData);
            return true;
        }
    }
    return false;
}
