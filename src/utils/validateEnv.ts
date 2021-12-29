import { cleanEnv, str, port, num } from 'envalid';

export default function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        MONGO_PATH: str(),
        PORT: port({ default: 3000 }),
        JWT_SECRET: str(),
        SALT: num(),
    });
}
