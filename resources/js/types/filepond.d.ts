declare module 'react-filepond' {
    import type * as React from 'react';
    import type { FilePondOptions } from 'filepond';

    export interface FilePondProps extends FilePondOptions {
        name?: string;
        className?: string;
        allowMultiple?: boolean;
        onupdatefiles?: (fileItems: any[]) => void;
    }

    export const FilePond: React.ComponentType<FilePondProps>;

    export function registerPlugin(...plugins: any[]): void;
}

declare module 'filepond-plugin-file-validate-size';
declare module 'filepond-plugin-file-validate-type';

