const express=require('express')
const HouseModel=require('../models/HouseSchema')


const houseRouter=express()


houseRouter.get('/',async(req,res)=>{
    try{
        const housesInfo= await HouseModel.find({});
        res.status(200).send(housesInfo)
    } catch(e){
        res.status(500).send(e)
    }
})


houseRouter.get('/houseById/:houseid',async(req,res)=>{
    try{
        let id=req.params.houseid;
        const houseById= await HouseModel.find({_id:{$eq:id}});
        res.status(200).send(houseById)
    } catch(e){
        res.status(500).send(e)
    }
})


houseRouter.get('/housesByCounty/:county',async(req,res)=>{
    try{
        let contyname=req.params.county;
        const houseById= await HouseModel.find({county:{$eq:contyname}});
        res.status(200).send(houseById)
    } catch(e){
        res.status(500).send(e)
    }
})


module.exports = houseRouter
