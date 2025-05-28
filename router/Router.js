// routes/dataRoute.js
import express from "express";
import { postDetails, getDetails, deleteProduct } from "../controller/ControlApi.js";
import { upload } from "../middleware/multer.js"

const route = express.Router();

route.post("/data", upload.single("image"), postDetails);
route.get("/data", getDetails);
route.delete("/data/:id", deleteProduct);

export default route;
