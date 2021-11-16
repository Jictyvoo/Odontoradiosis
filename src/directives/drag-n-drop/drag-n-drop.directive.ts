import {
    Directive,
    EventEmitter,
    HostBinding,
    HostListener,
    Output,
} from '@angular/core';
import { IUploadableFile } from 'src/util/general';

@Directive({
    selector: '[appDragNDrop]',
})
export class DragNDropDirective {
    @HostBinding('class.fileover') fileOver: boolean;
    @Output() fileDropped = new EventEmitter<IUploadableFile>();

    constructor() {
        this.fileOver = false;
    }

    // Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = true;
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(
        event: Event
    ): void {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = false;
    }

    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(event: {
        preventDefault: () => void;
        stopPropagation: () => void;
        dataTransfer: { files: any };
    }): void {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = false;
        let files = event.dataTransfer.files;
        if (files.length > 0) {
            this.fileDropped.emit(files);
        }
    }
}
