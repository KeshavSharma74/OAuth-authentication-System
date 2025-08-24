import express from "express"
import "dotenv/config"
import dbConnect from "./utils/database.js";
import userRoute from "./routes/user.route.js";
import cors from "cors"


const app=express();
app.use(cors());
app.use(express.json());
dbConnect();
const port=process.env.PORT || 4000;

app.get('/',(req,res)=>{
    return res.send('Server is live');
})

app.use('/api/auth',userRoute)
app.listen(port,()=>{
    console.log(`Server is listening on port : ${port}`);
})

