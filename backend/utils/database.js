import mongoose from "mongoose";

const dbConnect = async()=>{
    try{
        const instance = await mongoose.connect(`mongodb+srv://keshavsharma9472:ugSadwA333X4h6WB@cluster0.ntscly5.mongodb.net/AuthStore`);
        console.log("Database Connected Successfully")
    }
    catch(error){
        console.log('Database connection failed');
        console.log(error);
        process.exit(1);
    }

}

export default dbConnect;