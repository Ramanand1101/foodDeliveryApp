const express=require("express")

const{RestaurantModel}=require("../models/restaurant.model")
const restaurantRouter=express.Router()

restaurantRouter.get("/",async(req,res)=>{
    try{
        let data=await RestaurantModel.find()
        res.status(200).send(data)
    }
    catch(error){
        res.status(400).send("error getting all data")
    }
})

restaurantRouter.get("/:id",async(req,res)=>{
    let id=req.params.id
    try{
        let data=await RestaurantModel.findById(id)
        res.status(200).send(data)
    }
    catch(error){
        res.status(400).send("error happen while getting data")
    }
})
restaurantRouter.post("/addData",async(req,res)=>{
    try{
        let data=new RestaurantModel(req.body)
        await data.save()
        res.status(200).send(data)
    }
    catch(error){
        res.status(400).send("error while adding data")
    }
})


restaurantRouter.post("/:id/menu",async(req,res)=>{
    let id=req.params.id
    console.log(id)
    try{
        let data=await RestaurantModel.findById(id)
        data.menu.push(id)
        await data.save()
        res.status(200).send("item added to restaurant" +data.name)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

restaurantRouter.delete("/:id/menu/:id",async(req,res)=>{
    let restaurantId=req.params.id;
    let dishesId=req.params.dishesid
    try{
        let data=await RestaurantModel.findById(restaurantId)
        let menu=data.menu
        let newmenu=menu.filter((ele)=>ele._id!==`new ObjectId(${dishesId})`)
        data.menu=newmenu
        await data.save()
        res.status(201).send("item deleted")
    }
    catch(error){
        res.status(400).send(error.message)
    }
})
module.exports={
    restaurantRouter
}