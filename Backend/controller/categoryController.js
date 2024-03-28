import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient

const getAllCategories = async (req, res)=>{
    try{
        const categories = await prisma.category.findMany();
        res.json(categories)
        res.status(200).json({categories:"Categories found"})
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}

export{getAllCategories}