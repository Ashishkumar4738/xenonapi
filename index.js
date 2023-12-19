import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/route.js";
import db from "./database/db.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/auth',router)
app.use('/contect',router);

app.get("/",(req,res)=>{
    res.json("Welcome Xenon stack");
})


app.listen(5000,(req,res)=>{
    console.log("server started at port 5000");
})