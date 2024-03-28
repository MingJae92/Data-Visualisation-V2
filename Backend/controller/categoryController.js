import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient

const getAllCategories = async (req, res)=>{
    try{
        const categories = await prisma.category.findMany();
        res.json(categories)
    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}

export{getAllCategories}