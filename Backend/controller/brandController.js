import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const getAllBrands = async (req, res)=>{
    try{
        const brands = await prisma.brand.findMany();
        res.json(brands);
    }catch(error){
        res.status(500).json({error: "Internal server error" })
    }
}

export{getAllBrands}