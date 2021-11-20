export enum AcceptedFileType {
    IMAGE = 'image/*',
    ZIP = 'application/zip',
}

export interface IUploadableFile {
    file: File;
    name: string;
    type: string;
    size: number;
    progress: number;

    reader?: FileReader;
}

export interface ILoadedFile {
    fileType: AcceptedFileType;
    content: string | ArrayBuffer;
}
