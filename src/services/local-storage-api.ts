const SMTH_KEY = 'SMTH_KEY';

const parseJSON = <K>(text: string | null, defaultValue: K): K => {
    let result;
    try {
        result = text && JSON.parse(text);
    } catch {
        return defaultValue;
    }
    return result ?? defaultValue;
};

const getList = () => {
    const data = window.localStorage.getItem(SMTH_KEY);
    const defaultValue: string[] = [];
    return parseJSON(data, defaultValue);
};

export const localStorageApi = {
    smth: {
        getList,
    },
};
