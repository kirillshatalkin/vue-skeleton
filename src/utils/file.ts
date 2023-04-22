export const saveToFile = (data: string, filename: string, type?: string): void => {
    const blob = new Blob([data], { type });
    const el = window.document.createElement('a');
    el.href = window.URL.createObjectURL(blob);
    el.download = filename;
    document.body.appendChild(el);
    el.click();
    window.URL.revokeObjectURL(el.href);
    document.body.removeChild(el);
};
