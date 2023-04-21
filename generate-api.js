const { generateApi } = require('swagger-typescript-api');
const path = require('path');

generateApi({
    name: 'api.ts',
    url: '',
    output: path.resolve(process.cwd(), './src/services/generated'),
});
