import { Request, Response } from "express";
import Product from "../models/Product.model";
import { body } from "express-validator";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            limit: 10
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (req: Request, res: Response): Promise<Product | any> => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        return product;
    } catch (error) {
        console.log(error);
    }
}

export const getProductJsonById = async (req: Request, res: Response) => {
    return res.json(await getProductById(req, res));
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const product = await getProductById(req, res) as Product;

    // Actualizar
    product.name = req.body.name;
    product.price = req.body.price;
    product.availability = req.body.availability;

    await product.save();
    res.json({ data: product });
};

export const updateAvailablity = async (req: Request, res: Response) => {
    const product = await getProductById(req, res) as Product;

    // Actualizar
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
    const product = await getProductById(req, res) as Product;

    // Actualizar
    await product.destroy();
    res.json({ data: 'Product Deleted' })
};
