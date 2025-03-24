import express from 'express';
import 'dotenv/config'
import router from './router';
import {connectDB} from "./config/database";

const app = express();
connectDB();

//leer datos de formulario
app.use(express.json());

app.use('/', router)

export default app;