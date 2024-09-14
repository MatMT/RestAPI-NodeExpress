import { Router } from 'express';
import { createProduct, getProducts, getProductById } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

router.get('/', getProducts);

router.get('/:id',
    param('id').isInt().withMessage('ID no valid'),
    handleInputErrors,
    getProductById
);

router.post('/',
    // Validation
    body('name')
        .notEmpty().withMessage('The name cannot be empty'),
    body('price')
        .isNumeric().withMessage("Value no valid")
        .notEmpty().withMessage('The price cannot be empty')
        .custom(value => value > 0).withMessage("Price no valid"),

    handleInputErrors,
    createProduct
);

router.put('/', (req, res) => {
    res.json("From Put");
});

router.delete('/', (req, res) => {
    res.json("From Delete");
});

export default router;