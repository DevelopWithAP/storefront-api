import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import jwt from 'jsonwebtoken';


const userStore = new UserStore();
const productStore = new ProductStore();

const request = supertest(app);

const products: Product[] = [
    {
        name: 'Product 1',
        price: 3
    },
    {
        name: 'Product2',
        price: 11
    }
];

let token: string;

xdescribe('Testing /products endpoint', () => {
    beforeAll(async () => {
        const user: User = {
            first_name: 'Store',
            last_name: 'Dev',
            password: 'admin'
        };
        const testUser = await userStore.create(user);
        if(process.env.TOKEN_SECRET) {
            token = jwt.sign({ user: testUser }, process.env.TOKEN_SECRET);
        }
        else {
            throw new Error(`Could not authenticate user.`);
        }

        const testProduct: Product = await productStore.create(products[0]);
    });

    it('POST to /products should respond with 200 OK', async () => {
        token = `Bearer ${token}`;
        const response = await request.post('/products')
        .send(products[0])
        .set('Authorization', token);
        console.log(token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: response.body.id,
            name: products[0].name,
            price: products[0].price
        });
    });

    it('GET to products should respond with 200 OK', async () => {
        const response = await request.get('/products');
        expect(response.statusCode).toEqual(200);
    });

    it('GET to products/1 should respond with 200 OK', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toEqual(200);
    });

    it('PUT to /products/104 should return 200 OK', async () => {
        const response = await request.put('/products/104')
        .send({
            id: 104, 
            name: 'Updated Product 1',
            price: 5
        })
        .set('Authorization', token);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            id: 104,
            name: 'Updated Product 1',
            price: 5
        });
    });

    it('DELETE to /products/100 should respond with 200 OK', async () => {
        const response = await request.delete('/products/100')
        .set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });
});

