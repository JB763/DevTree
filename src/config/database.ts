import mongoose from 'mongoose'
import colors from "colors";


export const connectDB = async ()=>{

    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URI as string);
        const url = `${connection.host}:${connection.port}`;
        console.log(colors.cyan.bold(`Connected to Database: ${url}`));
    } catch(error){
        console.log(colors.bgRed.white.bold((error as Error).message));

        process.exit(1);
    }
}
















