import dotenv from 'dotenv';


dotenv.config(
    {
        path: process.cwd() + '/.env'
    }
);


export default {
    port: process.env.PORT,
    db: process.env.DB_HOST
}
