import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { Order, OrderStatus, OrderProduct, OrderStore } from '../../models/order';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const uStore = new UserStore();
const oStore = new OrderStore();
const pStore = new ProductStore();

let token: string;

const testPassword = process.env.POSTGRES_PASSWORD_TEST as string;

describe('Testing /orders endpoint', () => {
    beforeAll(async () => {
        const testUser: User = {
            first_name: 'Test',
            last_name: 'User',
            password: testPassword
        };

        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({user: testUser}, process.env.TOKEN_SECRET);
        }

        const testProduct: Product = {
            name: 'Test_Product',
            price: 12.99
        };

        const testOrder: Order = {
            user_id: Number(testUser.id),
            status: OrderStatus.PENDING
        };

        await uStore.create(testUser);
        await pStore.create(testProduct);

        
        it('GET to /orders should respond with 200 OK', async () => {
            const response = await request.get('/orders')
            .set('Authorization', `bearer ${token}`);

            expect(response.statusCode).toEqual(200);
        });
    })
})