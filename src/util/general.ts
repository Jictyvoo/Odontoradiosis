export interface IUploadableFile {
    file: File;
    name: string;
    type: string;
    size: number;
    progress: number;

    reader?: FileReader;
}

export enum AcceptedFileType {
    IMAGE = 'image/*',
    ZIP = 'application/zip',
}
