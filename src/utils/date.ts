import { format } from 'date-fns';

const DATE_FORMAT = 'yyyy.MM.dd HH:mm:ss';

export const formatDate = (value: Date) => {
    return format(value, DATE_FORMAT);
};
