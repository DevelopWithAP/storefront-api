import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { Order, OrderStatus, OrderProduct, OrderStore } from '../../models/order';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const uStore = new UserStore();
const oStore = new OrderStore();

let token: string;

describe('Testing /orders endpoint', () => {
    beforeAll(async () => {
        const testUser: User = {
            id: 2,
            firstName: 'Store',
            lastName: 'Dev0',
            password: 'testing123'
        };

        if(process.env.TOKEN_SECRET) {
            token = jwt.sign({user: testUser}, process.env.TOKEN_SECRET);
        }

        const testOrder: Order = {
            id: 1,
            user_id: testUser.id!,
            status: OrderStatus.PENDING
        };
        
        const user = await uStore.create(testUser);
        const order = await oStore.create(testOrder);
    });

    it('GET to /orders should respond with 200 OK', async () => {
        const response = await request.get('/orders');
        expect(response.statusCode).toEqual(200);
    });

    it('GET to /orders/6 should respond with 200 OK', async () => {
        const response = await request.get('/orders/6');
        expect(response.statusCode).toEqual(200);
    });

    it('GET to /orders/current/2 should respond with 200 OK', async () => {
        const response = await request.get('/orders/current/2')
        .set('Authorization', `bearer ${token}`);
        expect(response.statusCode).toEqual(200);
    });

    it('GET to /orders/completed/2 should respond with 200 OK', async () => {
        const response = await request.get('/orders/completed/2')
        .set('Authorization', `bearer ${token}`);
        expect(response.statusCode).toEqual(200);
    });

    it('PUT to /orders/10 should respond with 200 OK', async () => {
        const response = await request.put('/orders/10')
        .send({
            id: 10,
            user_id: 2,
            status: OrderStatus.COMPLETE
        })
        .set('Authorization', `bearer ${token}`);
        expect(response.statusCode).toEqual(200);
    });

    it('DELETE to /orders/5 should respond with 200 OK', async () => {
        const response = await request.delete('/orders/5')
        .set('Authorization', `bearer ${token}`);
        expect(response.statusCode).toEqual(200);
    });

    it('POST to /orders/10/products should respond with 200 OK', async () => {
        const response = await request.post('/orders/10/products')
        .send({
            order_id: 10,
            product_id: 4,
            quantity: 5
        })
        .set('Authorization', `bearer ${token}`);
        expect(response.statusCode).toEqual(200);
    });
})