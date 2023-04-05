import dotenv from 'dotenv'
dotenv.config();


import express from "express"
// import cors from "cors"
// import { sample_foods, sample_tags, sample_users } from "./data"
import foodRouter from './routers/food.router'
import userRouter from './routers/user.router'
import orderRouter from './routers/order.router'
import { dbConnect } from './configs/database.config';
dbConnect()

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
//    origin:["http://localhost:5000"]
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

app.use("/api/foods", foodRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)

const port = 5000
app.listen(port, () => {
    console.log("Website served in http://localhost:" + port);
    
})

//MongoDB Atlas password: 936OSdMqD1dov1ld

