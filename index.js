require("dotenv").config()
const express=require("express")
const {connection}=require("./config/db")
const { userRouter } = require("./router/user.router")
const {authenticate}=require("./middleware/authenticate")
const {orderRouter}=require("./router/order.router")
const{restaurantRouter}=require("./router/restaurant.router")
const app=express()

//============================================== middleware ============================================
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Api of food app")
})

//routes
app.use("/user",userRouter)
app.use(authenticate)
app.use("/order",orderRouter)
app.use("/restaurant",restaurantRouter)












//========================================= Dont touch below code ================================

app.listen(process.env.port,async()=>{
    try{
        await connection 
       console.log("DB connected")
    
    }
    catch(error){
        console.log("Not connected")
        console.log(error.message)
    }
    console.log(`Server running in port ${process.env.port}`)
})