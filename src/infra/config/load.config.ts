import * as dotenv from 'dotenv';

export function loadConfig() {
    const env = `${process.env.NODE_ENV || 'development'}.env`;
    dotenv.config({ path: env }).parsed
    process.env.PORT = process.env.PORT || '3000';
}