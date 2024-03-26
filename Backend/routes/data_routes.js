import express from "express";

const router = express.Router();

router.get("/", price_data);
router.get("/", retailer_data);
router.get("/", promotion_data);
router.get("/", product_data);
router.get("/", manufacturer_data);
router.get("/", category_data);
router.get("/", brand_data);


// router.post("/", registerCustomer);
// Price
// Retailer
// Promotion
// Product
// Manufacturer
// category
// Brand
