import colors from 'colors';
import express from 'express';
import productsRouter from './router';
import db from './config/db';

// Conect to DataBase
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.bgGreen("Conecction Success to DB"));
    } catch (error) {
        console.log(colors.red.bold('There was an error connecting to the DB'));
    }
}

connectDB();

const server = express();

server.use(express.json());
server.use('/api/products', productsRouter);

server.get('/api', (req, res) => {
    res.json({ msg: 'From API' })
});

export default server;