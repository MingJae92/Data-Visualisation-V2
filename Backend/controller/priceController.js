import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllPrices = async (req, res) => {
  try {
    const prices = await prisma.price.findMany();
    json.res(prices);
    res.status(200).json({price:"Prices found"})
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {getAllPrices}
