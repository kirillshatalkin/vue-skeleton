import { ElNotification } from 'element-plus';

export const handleError = <T, K extends any[]>(
    fn: (...args: K) => Promise<T> | T,
    defaultValue: T,
): ((...args: K) => Promise<T>) => {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (e) {
            ElNotification({
                title: 'Error',
                message: (e as Error)?.message,
                type: 'error',
            });

            return defaultValue;
        }
    };
};
