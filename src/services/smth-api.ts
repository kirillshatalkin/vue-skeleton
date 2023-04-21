import { Api } from '@/services/generated/api';
import { appConfig } from '@/app.config';

export const smthApi = new Api({
    baseUrl: appConfig.apiUrl,
});
