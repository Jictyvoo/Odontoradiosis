import { Component } from '@angular/core';
import { IUploadableFile } from 'src/util/general';

@Component({
    selector: 'app-file-dropzone',
    templateUrl: './dropzone.component.html',
    styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {
    files: IUploadableFile[] = [];

    /**
     * on file drop handler
     */
    onFileDropped(event: IUploadableFile): void {
        this.files.push(event);
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler(eventTarget: EventTarget | null): void {
        const targetElement = eventTarget as HTMLInputElement;
        const files = targetElement?.files;
        if (files) {
            this.prepareFilesList(files);
        }
    }

    /**
     * Delete file from files list
     * @param index (File index)
     */
    deleteFile(index: number): void {
        this.files.splice(index, 1);
    }

    /**
     * Simulate the upload process
     */
    uploadFilesSimulator(index: number): void {
        setTimeout(() => {
            if (index === this.files.length) {
                return;
            } else {
                const progressInterval = setInterval(() => {
                    if (this.files[index].progress === 100) {
                        clearInterval(progressInterval);
                        this.uploadFilesSimulator(index + 1);
                    } else {
                        this.files[index].progress += 5;
                    }
                }, 200);
            }
        }, 1000);
    }

    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: FileList): void {
        for (let index = 0; index < files.length; index++) {
            const item = files.item(index);
            if (item) {
                this.files.push({
                    name: item.name,
                    size: item.size,
                    type: item.type,
                    file: item,
                    progress: 0,
                });
            }
        }
        this.uploadFilesSimulator(0);
    }

    /**
     * format bytes
     * @param bytes (File size in bytes)
     * @param decimals (Decimals point)
     */
    formatBytes(bytes: number, decimals: number = 2): string {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        );
    }
}
