import { User, UserStore } from '../../models/user';
import { Order, OrderStatus, OrderStore, OrderProduct } from '../../models/order';

const store = new OrderStore();
const userStore = new UserStore();

let user: User = {
    id: 96,
    first_name: 'Store',
    last_name: 'Dev',
    password: process.env.POSTGRES_PASSWORD_TEST as string
};

let order0: Order = {
    id: 1,
    user_id: 96,
    status: OrderStatus.PENDING
};

let order1: Order = {
    id: 2,
    user_id: 96,
    status: OrderStatus.PENDING
};

let orderProduct: OrderProduct = {
    order_id: '85',
    product_id: '97',
    quantity: 3
};

// beforeEach(async () => {
//     await userStore.create(user);

//     await store.create(order0);
//     await store.create(order1);
// });

xdescribe('Order model', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a new order', async () => {
        const result = await store.create({
            user_id: 85,
            status: OrderStatus.PENDING
        });

        expect(String(result.user_id)).toEqual('85');
        expect(result.status).toEqual(OrderStatus.PENDING);
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a non-empty array of Order objects', async () => {
        const result = await store.index();

        expect(result.length).toBeGreaterThan(0);
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('show method should retrieve the correct order', async () => {
        const result = await store.show(85);

        expect(result.id).toEqual(85);
        expect(Number(result.user_id)).toEqual(85);
    });

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

    it('update method should correctly update order information', async () => {
        const result = await store.update({
            id: 86,
            user_id: 85,
            status: OrderStatus.COMPLETE
        });

        expect(result.status).toEqual(OrderStatus.COMPLETE);
    });

    it('should have a delete method', () => {
        expect(store.remove).toBeDefined();
    });

    it('remove method should remove the order', async () => {
        const result = await store.remove(100);

        expect(result.id).toBe(100);
    });


    it('should have an addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });

    it('addProduct method should add a product to the current order', async () => {
        const result = await store.addProduct(orderProduct);

        expect(Number(result.order_id)).toEqual(85);
        expect(Number(result.product_id)).toEqual(97);
        expect(result.quantity).toEqual(3);
    });

    it('should have a getCurrentOrderByUserId method', () => {
        expect(store.getCurrentOrderByUserId).toBeDefined();
    });

    it('getCurrentOrderByUserId should return the user\'s current order', async () => {
        const result = await store.getCurrentOrderByUserId(String(85));

        expect(Number(result.user_id)).toEqual(85);
    });

    it('should have a getCompletedOrdersByUserId method', () => {
        expect(store.getCompletedOrdersByUserId).toBeDefined();
    });

    it('getCompletedOrdersByUserId method should return all the completed order for the user', async () => {
        const result = await store.getCompletedOrdersByUserId(String(85));

        expect(result.length).toBe(1);
    });
});