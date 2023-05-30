import dotenv from 'dotenv';


dotenv.config(
    {
        path: process.cwd() + '/.env'
    }
);


export default {
    port: process.env.PORT,
    db_url: process.env.DB_HOST
}
