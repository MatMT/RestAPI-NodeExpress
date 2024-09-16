import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {

    it('Should display validation erros', async () =>{
        const response = await request(server).post('/api/products')
        .send({ })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('Should validate that price is greater than 0', async () =>{
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

    it('Should validate that price is a number and greater than 0', async () =>{
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