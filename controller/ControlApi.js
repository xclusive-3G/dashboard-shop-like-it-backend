// controller/ControlApi.js
import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Product from "../model/dataModel.js";

// ✅ Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ POST: Upload image and save product data
export const postDetails = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided." });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products",
            resource_type: "auto",
            transformation: [{
                fetch_format: 'auto',
                quality: "auto"
            },
            {
                width: 1200,
                height: 1200,
                crop: "fill",
                gravity: "auto"
            }

            ]
        });

        const thumbnailImage = cloudinary.url(result.public_id, {
            width: 900,
            height: 900,
            crop: "thumb",
            gravity: "face",
            secure: true
        })

        // Save product info in MongoDB
        const { title, price, description, categories } = req.body;
        const product = new Product({
            title,
            price,
            description,
            categories,
            image: result.secure_url,
            thumbnailImage: thumbnailImage
        });

        await product.save();

        // Delete file from local uploads folder after upload
        fs.unlinkSync(req.file.path);

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.error("❌ Error in postDetails:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ GET: Fetch all products
export const getDetails = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error("❌ Error in getDetails:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};

// ✅ DELETE: Remove product by ID
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("❌ Error in deleteProduct:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
};
