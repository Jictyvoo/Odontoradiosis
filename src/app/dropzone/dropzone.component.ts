import { Component } from '@angular/core';
import { AcceptedFileType, IUploadableFile } from 'src/util/general';

@Component({
    selector: 'app-file-dropzone',
    templateUrl: './dropzone.component.html',
    styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {
    files: IUploadableFile[] = [];

    /**
     * Load file from file list
     * @param event (Drag event)
     */
    onFileDropped(event: FileList): void {
        this.prepareFilesList(event);
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
        const deleted = this.files[index];
        deleted?.reader?.abort();
        this.files.splice(index, 1);
    }

    private loadFile(item: File): void {
        // check if the file is a image or a zip file
        const fileType = item.type.match('image.*')
            ? AcceptedFileType.IMAGE
            : item.name.endsWith('.zip')
            ? AcceptedFileType.ZIP
            : null;

        if (fileType) {
            const reader = new FileReader();

            this.files.push({
                name: item.name,
                size: item.size,
                type: item.type,
                file: item,
                progress: 0,
                reader: reader,
            });

            reader.readAsDataURL(item);

            const currentIndex = this.files.length - 1;
            reader.onprogress = (event: ProgressEvent<FileReader>) => {
                this.files[currentIndex].progress = Math.round(
                    (event.loaded / event.total) * 100
                );
            };

            if (fileType === AcceptedFileType.IMAGE) {
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    /*const image = new Image();
                    image.src = event.target!.result as string;*/
                    console.log(event.target!.result);
                };
            } else {
                // TODO: Zip file
            }
        }
    }

    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: FileList): void {
        for (let index = 0; index < files.length; index++) {
            const item = files.item(index);
            if (item) {
                this.loadFile(item);
            }
        }
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
