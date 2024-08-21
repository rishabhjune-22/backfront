const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors=require('cors')
const houseRouter = require("./routes/houseRoutes")
const enquiryRouter = require("./routes/enquiryRoutes")
const userRouter = require("./routes/userRoutes")
const app = express()
dotenv.config()
const port = process.env.PORT

app.use(express.json())
app.use(cors())


const db = module.exports=async()=>{
    try{
        await mongoose.connect(process.env.MONGODBURL,{
            user : process.env.DBUSER,
            pass : process.env.DBPASS, 
        })
        console.log("MongoDB Connection is successful")
    }catch(e){
        console.log(e);
        console.log("MongoDB Connection is not successful")
    }
}
db();

app.use("/houses/",houseRouter)
app.use("/enquiry/",enquiryRouter)
app.use("/user/",userRouter)

app.listen(port, () => {
    console.log('Server running on port 4000');
  });