const bcrypt=require("bcrypt")
const express=require("express")
const {OrderModel} = require("../models/order.model")

const orderRouter=express.Router()


orderRouter.post("/",async(req,res)=>{
    try{
        let data=new OrderModel(req.body)
        await data.save()
        res.status(200).send("new order has been done")
    }
    catch(error){
        res.status(400).send(error.message)
    }

})

orderRouter.get("/:id",async(req,res)=>{
    try{
        let data=await OrderModel.findById(req.params.id)
        res.status(200).send(data)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

orderRouter.patch("/:id",async(req,res)=>{
    try{
        await OrderModel.findByIdAndUpdate(req.params.id,req.body)
        res.send(200).json({message:"Order Update Successfully"})
    }
    catch(error){
        res.status(400).send(error.message)
    }
})
module.exports={
    orderRouter
}
