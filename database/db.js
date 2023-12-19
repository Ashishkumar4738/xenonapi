import { config } from "dotenv";
config();
import mongoose from "mongoose";


main().catch((err=>console.log(err)));
export default async function main(){
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;

    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.c55a6jh.mongodb.net/?retryWrites=true&w=majority`)
    console.log("databse connected succesfully....");
}