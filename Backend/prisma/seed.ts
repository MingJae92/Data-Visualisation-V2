import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
db.$connect();

createReadStream("data.csv")
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

    const { id: category_id } = await db.category.upsert({
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

    const { id: manufacturer_id } = await db.manufacturer.upsert({
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

    const { id: retailer_id } = await db.retailer.upsert({
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

    const { id: product_id } = await db.product.upsert({
      create: {
        ean,
        brand,
        product_title,
        image,
        manufacturer_id,
        category_id,
      },
      where: {
        ean,
      },
      update: {
        ean,
        brand,
        product_title,
        image,
        manufacturer_id,
        category_id,
      },
    });
    try {
      if (on_promotion === "TRUE") {
        const { id: promotion_id } = await db.promotion.upsert({
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
            base_price: parseFloat(base_price),
            shelf_price: parseFloat(shelf_price),
            promoted_price: parseFloat(promoted_price),
            retailer_id,
            product_id,
            on_promotion: true,
            promotion_id,
          },
        });
      } else {
        await db.price.create({
          data: {
            date: new Date(date),
            base_price: parseFloat(base_price),
            shelf_price: parseFloat(shelf_price),
            promoted_price: parseFloat(promoted_price),
            retailer_id,
            product_id,
            on_promotion: false,
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
