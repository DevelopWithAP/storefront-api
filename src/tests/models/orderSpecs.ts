
import { chownSync } from 'fs';
import { Order, OrderStatus, OrderStore, OrderProduct } from'../../models/order';

const store = new OrderStore();

beforeAll(async () => {
    const order: Order = {
        user_id: 4,
        status: OrderStatus.PENDING
    };

    await store.create(order);
})

xdescribe('Order model', ()=> {
    it('should have an index method', ()=> {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of orders', async () => {
        const result = await store.index();
        console.log(`Call to index() returns: ${result}`);
        expect(result.length).toBeGreaterThan(0);
    });
    
    it('Should have a show method', ()=> {
        expect(store.show).toBeDefined();
    });

    it('show method should get the correct product', async () => {
        const result = await store.show(2);
        expect(result.id).toEqual(2);
    });

    it('should have a create method', ()=> {
        expect(store.create).toBeDefined();
    });

    it('create method should add a new order', async () => {
        const result = await store.create({
            user_id: 3,
            status: OrderStatus.PENDING
        });
        expect(result.user_id).toMatch('3');
        expect(result.status).toEqual(OrderStatus.PENDING);
    });

    it('should have an addProduct method', ()=> {
        expect(store.addProduct).toBeDefined();
    });

    it('addProduct method should add a product to the order', async () => {
        const result = await store.addProduct({
            order_id: '3',
            product_id: '4',
            quantity: 10
        });
        expect(result).toEqual({
            id: result.id, 
            order_id: '3',
            product_id: '4',
            quantity: 10
        });
    });

    it('should have an update method', ()=> {
        expect(store.update).toBeDefined();
    });

    it('update method should correctly update order details', async () => {
        const result = await store.update({
            id: 3,
            user_id: 3,
            status: OrderStatus.COMPLETE
        });
        expect(result.status).toEqual('complete');
    });

    it('should have a delete method', ()=> {
        expect(store.remove).toBeDefined();
    });

    it('delete method should remove the correct order', async () => {
        const result = await store.remove(2);
        expect(result.id).toEqual(2);
    });

    it('should have a getCurrentOrderByUserId method', () => {
        expect(store.getCurrentOrderByUserId).toBeDefined();
    });

    it('getCurrentOrderByUserId should return an order', async () => {
        const result = await store.getCurrentOrderByUserId('3');
        console.log(`Function call returned: ${result}`);

        expect(result.user_id).toContain('3');
        expect(result.status).toContain('active');
    });

    it('should have a getCompletedOrdersByUserId method', async () => {
        const result = await store.getCompletedOrdersByUserId('3');
        expect(result.length).toEqual(1);
    });
});