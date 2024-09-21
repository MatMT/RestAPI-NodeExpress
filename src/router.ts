import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, updateAvailablity, deleteProduct } from './handlers/product';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();
/** 
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The Product name
 *                      example: Test item
 *                  price: 
 *                      type: number
 *                      description: The Product price
 *                      example: 500
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true        
 * */ 

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200: 
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: THe ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found  
 *              400:
 *                  description: Bad Request - Invalid ID
 */
router.get('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    getProductById
);

/**
 * @swagger
 * /api/products:
 *  post: 
 *      summary: Creates a new product
 *      tags: 
 *          - Products
 *      description: Returns a new record in the datbase
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: "Title"
 *                          price:
 *                              type: number
 *                              example: 400
 *      responses:
 *          201:
 *              description: Product created succesfullly
 *          400:
 *              description: Bad Request - invalid input data
 */
router.post('/',
    // Validation
    body('name')
        .notEmpty().withMessage('The name cannot be empty'),
    body('price')
        .isNumeric().withMessage("Value no valid")
        .notEmpty().withMessage('The price cannot be empty')
        .custom(value => value > 0).withMessage("Invalid Price"),

    handleInputErrors,
    createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID opf the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Test product | Edit"
 *                              price: 
 *                                  type: number
 *                                  example: 200
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              201:
 *                  description: Succesful response
 *                  content: 
 *                      application/json: 
 *                          schema:
 *                             $ref: '#/components/schemas/Product' 
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 */
router.put('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    body('name')
        .notEmpty().withMessage('The name cannot be empty'),
    body('price')
        .isNumeric().withMessage("Value no valid")
        .notEmpty().withMessage('The price cannot be empty')
        .custom(value => value > 0).withMessage("Invalid Price"),
    body('availability')
        .isBoolean().withMessage('Value no valid for availability'),

    handleInputErrors,
    updateProduct);

router.patch('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    updateAvailablity
)

router.delete('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    deleteProduct
);

export default router;