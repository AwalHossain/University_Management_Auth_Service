import mongoose from "mongoose";
import  app  from "./app";
import config from './config/index';



async function bootstrap(){

    try {
        await mongoose.connect(config.db_url as string);

        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
      } catch (error) {
        console.log(error);
      }

}

bootstrap();

