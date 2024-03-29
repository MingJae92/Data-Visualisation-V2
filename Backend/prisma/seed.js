import { parse } from "csv-parse";
import { createReadStream}  from "fs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
db.$connect();

createReadStream("data/data.csv")
  .pipe(parse({}))
  .on("data", async (row) => {
    const [
      date,
      retailer,
      ean,
      category,
      manufacturer,
      brand,
      product_title,
      image,
      on_promotion,
      promotion_description,
      base_price,
      shelf_price,
      promoted_price,
    ] = row;

    const { id: categoryId } = await db.category.upsert({
      create: {
        name: category,
      },
      where: {
        name: category,
      },
      update: {
        name: category,
      },
    });

    const { id: manufacturerId } = await db.manufacturer.upsert({
      create: {
        name: manufacturer,
      },
      where: {
        name: manufacturer,
      },
      update: {
        name: manufacturer,
      },
    });

    const { id: retailerId } = await db.retailer.upsert({
      create: {
        name: retailer,
      },
      where: {
        name: retailer,
      },
      update: {
        name: retailer,
      },
    });

    const { id: productId } = await db.product.upsert({
      create: {
        ean,
        brand,
        productTitle: product_title,
        image,
        manufacturerId,
        categoryId,
      },
      where: {
        ean,
      },
      update: {
        ean,
        brand,
        productTitle: product_title,
        image,
        manufacturerId,
        categoryId,
      },
    });
    try {
      if (on_promotion === "TRUE") {
        const { id: promotionId } = await db.promotion.upsert({
          create: {
            description: promotion_description,
          },
          where: {
            description: promotion_description,
          },
          update: {
            description: promotion_description,
          },
        });

        await db.price.create({
          data: {
            date: new Date(date),
            basePrice: parseFloat(base_price),
            shelfPrice: parseFloat(shelf_price),
            promotedPrice: parseFloat(promoted_price),
            retailerId,
            productId,
            onPromotion: true,
            promotionId,
          },
        });
      } else {
        await db.price.create({
          data: {
            date: new Date(date),
            basePrice: parseFloat(base_price),
            shelfPrice: parseFloat(shelf_price),
            promotedPrice: parseFloat(promoted_price),
            retailerId,
            productId,
            onPromotion: false,
          },
        });
      }
    } catch (error) {
      console.log("Error on row: ", row);
      console.log(error);
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  })
  .on("finish", () => {
    console.log("Database successfully processed");
    db.$disconnect();
  });
console.log(data)