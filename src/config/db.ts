import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import Product from '../models/Product.model';
 
dotenv.config();
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
 
const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [join(__dirname, '../models/*.ts')]
});

db.addModels([Product]);
 
export default db;