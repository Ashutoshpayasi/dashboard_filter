const express=require("express")
const router=express.Router()
const Model=require("../Model/dashbordSchema")

router.get("/filterList",async(req,resp)=>{
   const data=await Model.find()
   resp.send(data)
})
router.post("/adddata",async(req,res)=>{
   const data= await Model.insertMany(req.body)
   //const res=await data.save()
   res.json({message:"data added successfully"})
})

router.post("/search",async(req,resp)=>{
   // console.log(req.body)
   const data=await Model.find(req.body)
   resp.status(200).json(data)
    
})
router.get("/dashbord/:id",async(req,resp)=>{
   // console.log(req.params.id)
   const data=await Model.findById({_id :req.params.id})

   resp.status(200).json(data)


})
module.exports=router