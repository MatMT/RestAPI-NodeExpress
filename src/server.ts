import express from 'express';
import colors from 'colors';
import cors, {CorsOptions} from "cors";
import swagerUI from 'swagger-ui-express';
import swaggerSpec, {swagggerUiOptions} from './config/swagger';
import productsRouter from './router';
import db from './config/db';
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

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

// Enable connection to the server
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
server.use(cors(corsOptions));
server.use(express.json());

server.use(morgan('dev'))

// API calls
server.use('/api/products', productsRouter);

// Docs
server.use('/docs', swagerUI.serve, swagerUI.setup(swaggerSpec, swagggerUiOptions));

export default server;