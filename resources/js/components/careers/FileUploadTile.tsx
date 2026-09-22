import React, { useEffect, useId, useState } from 'react';

interface FileUploadTileProps {
    id?: string;
    name: string;
    label: React.ReactNode;
    accept: string;
    required?: boolean;
    multiple?: boolean;
    help?: string;
    emptyTitle?: string;
    formatHint?: string;
    resetKey?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploadTile({
    id: idProp,
    name,
    label,
    accept,
    required = false,
    multiple = false,
    help,
    emptyTitle = 'Tap to choose file',
    formatHint = 'PDF, DOC, DOCX, JPG, PNG',
    resetKey = 0,
    onChange,
}: FileUploadTileProps): JSX.Element {
    const autoId = useId();
    const id = idProp ?? autoId;
    const [summary, setSummary] = useState<string | null>(null);

    useEffect(() => {
        setSummary(null);
    }, [resetKey]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            setSummary(null);
        } else if (files.length === 1) {
            setSummary(files[0].name);
        } else {
            setSummary(`${files.length} files selected`);
        }

        onChange?.(event);
    };

    return (
        <div className="intl-app-field">
            <span className="intl-app-field__label">{label}</span>
            <label htmlFor={id} className="intl-app-file-tile" data-cursor-hover>
                <img src="/file-upload.svg" alt="" className="intl-app-file-tile__icon" width={48} height={48} />
                <span className="intl-app-file-tile__title">{summary ?? emptyTitle}</span>
                <span className="intl-app-file-tile__hint">{formatHint}</span>
            </label>
            <input
                id={id}
                name={name}
                type="file"
                className="intl-app-file-tile__input"
                accept={accept}
                required={required}
                multiple={multiple}
                onChange={handleChange}
            />
            {help && <p className="intl-app-help">{help}</p>}
        </div>
    );
}
