import mongoose from "mongoose";
import "dotenv/config"

const dbConnect = async()=>{
    try{
        const instance = await mongoose.connect(`${process.env.DATABASE_URL}/AuthStore`);
        console.log("Database Connected Successfully")
    }
    catch(error){
        console.log('Database connection failed');
        console.log(error);
        process.exit(1);
    }

}

export default dbConnect;