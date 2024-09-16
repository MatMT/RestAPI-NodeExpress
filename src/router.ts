import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, getProductJsonById, updateAvailablity, deleteProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

router.get('/', getProducts);

router.get('/:id',
    param('id').isInt().withMessage('ID no valid'),
    handleInputErrors,
    getProductJsonById
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

router.put('/:id',
    param('id').isInt().withMessage('ID no valid'),
    body('name')
        .notEmpty().withMessage('The name cannot be empty'),
    body('price')
        .isNumeric().withMessage("Value no valid")
        .notEmpty().withMessage('The price cannot be empty')
        .custom(value => value > 0).withMessage("Price no valid"),
    body('availability')
        .isBoolean().withMessage('Value no valid for availability'),

    handleInputErrors,
    updateProduct);

router.patch('/:id',
    param('id').isInt().withMessage('ID no valid'),
    handleInputErrors,
    updateAvailablity
)

router.delete('/:id',
    param('id').isInt().withMessage('ID no valid'),
    handleInputErrors,
    deleteProduct
);

export default router;