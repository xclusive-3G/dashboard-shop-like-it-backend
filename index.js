
import express from"express"
import mongoose from "mongoose"
import cors from "cors"
import dataRoute from "./router/Router.js"


const app = express()
app.use(express.json())
app.use(cors())
app.listen(3000,()=>{console.log("connected to port 3000")})

app.use("/api",dataRoute)

mongoose.connect("mongodb://localhost:27017/sekanistore")
.then(()=>{console.log("connected to database")})
.catch((err)=>{console.log(err)})