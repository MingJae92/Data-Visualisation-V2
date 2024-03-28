import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const getAllProducts = async(req, res)=>{
    try {
        const products = await prisma.products.findMany();
        res.json(products)
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
}

export {getAllProducts}