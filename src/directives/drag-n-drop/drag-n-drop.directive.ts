import {
    Directive,
    EventEmitter,
    HostBinding,
    HostListener,
    Output,
} from '@angular/core';

@Directive({
    selector: '[appDragNDrop]',
})
export class DragNDropDirective {
    @HostBinding('class.fileover') fileOver: boolean;
    @Output() fileDropped = new EventEmitter<FileList>();

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
    @HostListener('drop', ['$event']) public ondrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = false;
        const files = event.dataTransfer?.files;
        if ((files?.length ?? 0) > 0) {
            this.fileDropped.emit(files);
        }
    }
}
