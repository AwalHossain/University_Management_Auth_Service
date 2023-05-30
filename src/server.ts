import mongoose from "mongoose";

  
async function bootstrap(){

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
      } catch (error) {
        console.log(error);
      }
}

bootstrap();

