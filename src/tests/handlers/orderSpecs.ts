import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { Order, OrderStatus, OrderProduct } from '../../models/order';

const request = supertest(app);

xdescribe('Testing the /orders API endpoint', () => {
    let UserToken: string;

    const mockUser: User = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'testing123'
    };

    const mockOrder: Order = {
        user_id: 1,
        status: OrderStatus.PENDING
    };

    const mockOrderProduct: OrderProduct = {
        order_id: '1',
        product_id: '1',
        quantity: 1
    };

    const mockProduct: Product = {
        id: 1,
        name: 'Product01',
        price: 49.99,
        
    };

    const mockProductUpdate: Product = {
        id: 1,
        name: 'Product01',
        price: 59.99,
    };

    beforeAll(async () => {
        let response = await request.post('/users').send(mockUser);
    });

    it('should show a list of all orders', async () => {
        await request.get('/orders')
            .set('Autorization', 'bearer' + UserToken)
            .expect(200);
    });

    it('should order with id of 1', async () => {
        await request.get(`/orders/${mockOrder.id}`)
            .set('Autorization', 'bearer' + UserToken)
            .expect(200);
    });

    it('should create a new order', async () => {
        await request.post('/orders')
            .send(mockOrder)
            .set('Authorization', 'bearer' + UserToken)
            .expect(200);
    });

    it('should create a new OrderProduct', async () => {
        await request.post(`/orders/${mockOrder.id}/products`)
            .send(mockOrderProduct)
            .set('Authorization', 'bearer' + UserToken)
            .expect(200);
    });

    it('should update an order', async () => {
        await request.put(`/orders/${mockOrder.id}`)
            .send({
                id: mockOrder.id,
                user_id: mockOrder.user_id,
                status: OrderStatus.COMPLETE
            })
            .set('Authorization', 'bearer' + UserToken)
            .expect(200);
    });

    it('should delete a product', async () => {
        await request.delete('/orders/20')
            .set('Authorization', 'bearer' + UserToken)
            .expect(200);
    });

    it('should not delete a product in the absence of a token', async () => {
        await request.delete('/orders/20')
            .expect(401);
    });

});


