import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { Order, OrderStatus, OrderProduct, OrderStore } from '../../models/order';
import jwt from 'jsonwebtoken';
import userRoutes from '../../handlers/user';

const request = supertest(app);
const uStore = new UserStore();
const oStore = new OrderStore();
const pStore = new ProductStore();

const testPassword: string = process.env.POSTGRES_PASSWORD_TEST as string;
const secret: string = process.env.TOKEN_SECRET as string;

describe('Testing /orders endpoints', () => {
    let token: string;
    let order: Order;
    let user: User;
    let product: Product;
    
    beforeAll(async () => {
        user = {
            first_name: 'Test',
            last_name: 'User',
            password: testPassword
        };

        product = {
            name: 'Test Product',
            price: 4.99
        };

        order = {
            user_id: Number(user.id),
            status: OrderStatus.PENDING
        };

        let response = await request.post('/users').send(user);
        token = response.body;
    });

    it('POST to /orders should respond with a 200 OK', async () => {
        const response = await request.post('/orders')
        .send({
            user_id: user.id,
            status: OrderStatus.PENDING
        })
        .set('Authorization', `bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('GET to /orders should respond with a 200 OK', async () => {
        const response = await request.get('/orders')
        .set('Authorization', `bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('GET to /orders/1 should respond with 200 OK', async () => {
        const response = await request.get('/orders/1')
        .set('Authorization', `bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('PUT to /orders/1 should respond with 200 OK', async () => {
        const response = await request.put('/orders/1')
        .send({
            user_id: user.id,
            status: OrderStatus.COMPLETE
        })
        .set('Authorization', `bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('DELETE to /orders/2 should delete with 200 OK', async () => {
        const response = await request.delete('/orders/2')
        .set('Authorization', `bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('POST to /orders/1/products should respond with 200 OK', async () => {
        const response = await request.post('/orders/1/products')
        .send({
            order_id: order.id,
            product_id: product.id,
            quantity: 5
        })
        .set('Authorization', `bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    it(`GET to /orders/current/1 should respond with 200 OK`, async () => {
        const response = await request.get('/orders/current/1')
        .set('Authorization', `bearer ${token}`);
        
        expect(response.statusCode).toBe(200);
    });

    it('GET to /orders/completed/1 should respond with 200 OK', async () => {
        const response = await request.get('/orders/completed/1')
        .set('Authorization', `bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });
});