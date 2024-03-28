import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const getAllRetailers = async(req, res)=>{
    try{
        const retailers = await prisma.retailer.findMany();
        res.json(retailers)
        res.status(200).json({retailers:"Retailers found"})
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
   
}

export{getAllRetailers}