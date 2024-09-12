import colors from 'colors';
import express from 'express';
import productsRouter from './router';
import db from './config/db';

// Conect to DataBase
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgGreen("Conecction Success to DB"));
    } catch (e) {
        console.log(colors.red.bold(e));
    }
}

connectDB();

const server = express();
server.use('/api/productos', productsRouter);

export default server;