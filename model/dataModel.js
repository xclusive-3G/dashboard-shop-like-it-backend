import mongoose from "mongoose";
import { type } from "os";

const detailSchema = mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    price:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required: true,
    },
    categories:{
        type:[String],
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    thumbnailImage:{
        type:String,
        required: true,
    }
})

const detailsModel = mongoose.model("details",detailSchema)

export default detailsModel