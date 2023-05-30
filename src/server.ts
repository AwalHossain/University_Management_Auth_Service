import mongoose from "mongoose";
import  app  from "./app";

  

const port = 5000;



async function bootstrap(){

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
      } catch (error) {
        console.log(error);
      }

}

bootstrap();

