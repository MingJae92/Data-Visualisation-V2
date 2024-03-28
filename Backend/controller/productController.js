import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const getAllProducts = async(req, res)=>{
    try {
        const products = await prisma.product.findMany();
        res.json(products)
        res.status(200).json({products:"Products found"})
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
}

export {getAllProducts}