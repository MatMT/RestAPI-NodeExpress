import express from 'express';
import colors from 'colors';
import swagerUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
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

// server.get('/api', (req, res) => {
//     res.json({ msg: 'From API' })
// });

// Docs
server.use('/docs', swagerUI.serve, swagerUI.setup(swaggerSpec));

export default server;