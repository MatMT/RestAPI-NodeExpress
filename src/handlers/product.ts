import { Request, Response } from "express";
import Product from "../models/Product.model";

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
        throw (error);
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: 'Product not found'
        });
    }

    return res.json({data: product});
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({ data: product });
    } catch (error) {
        throw (error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: 'Product not found'
        });
    }

    // Actualizar
    product.name = req.body.name;
    product.price = req.body.price;
    product.availability = req.body.availability;

    await product.save();
    res.json({ data: product });
};

export const updateAvailablity = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: 'Product not found'
        });
    }

    // Actualizar
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            error: 'Product not found'
        });
    }

    // Actualizar
    await product.destroy();
    res.json({ data: 'Product Deleted' })
};
