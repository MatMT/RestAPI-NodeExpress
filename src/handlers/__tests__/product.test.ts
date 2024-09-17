import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {

    it('Should display validation erros', async () => {
        const response = await request(server).post('/api/products')
            .send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('Should validate that price is greater than 0', async () => {
        const response = await request(server).post('/api/products')
            .send({
                name: "Screen - Testing",
                price: 0
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('Should validate that price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products')
            .send({
                name: "Screen - Testing",
                price: "String"
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    // ================================================================== |

    it('Should create a new Product', async () => {
        const response = await request(server).post('/api/products')
            .send({
                name: "Screen - Testing",
                price: 7
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => {
    it('Should check if api/products URL exists', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404)
    })

    it('Get a JSON response with products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');

        expect(response.body).not.toHaveProperty('errors');
    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000;
        const response = await request(server).get(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    })

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Invalid ID');
    })


    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    })
})

describe('PUT /api/products/:id', () => {
    it('Should check a valid ID in the URL', async () => {
        const response = await request(server)
            .put('/api/products/not-valid-url')
            .send({
                name: "Test",
                availability: false,
                price: 10
            })
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Invalid ID');
    })

    it('Should display validation errror messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should validate that the price is greater than 0', async () => {
        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: "Test",
                availability: false,
                price: 0
            })

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Invalid Price')

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000;
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Test",
                availability: false,
                price: 10
            })

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    it('Should update an existing product with valid data', async () => {
        const response = await request(server)
            .put(`/api/products/1`)
            .send({
                name: "Camera",
                availability: true,
                price: 19
            })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors');
    })
})

describe('DELETE /api/products/:id', () => {
    it('Should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Invalid ID')
    })

    it('Should return a 404 response for a non-existent product', async() =>  {
        const productId = 2000;
        const response = await request(server).delete(`/api/products/${productId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found');

        expect(response.status).not.toBe(200);
    })

    it('Should delete a product', async () => {
         const response = await request(server).delete('/api/products/1');
         
         expect(response.status).toBe(200);
         expect(response.body.data).toBe("Product Deleted")

         expect(response.status).not.toBe(404);
         expect(response.status).not.toBe(400);
    })
})