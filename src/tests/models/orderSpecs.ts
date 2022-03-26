import { User, UserStore } from '../../models/user';
import { Order, OrderStatus, OrderStore, OrderProduct } from '../../models/order';
import { Product, ProductStore } from '../../models/product';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const testPassword: string = process.env.POSTGRES_PASSWORD_TEST as string;

let testUser: User;
let testProduct: Product;

describe('Order Model: ', () => {
    
    beforeAll(async () => {
        testUser = await userStore.create({
            first_name: 'Test',
            last_name: 'User',
            password: testPassword
        });

        testProduct = await productStore.create({
            name: 'Test Product',
            price: 34.99
        });

    });

    // afterAll(async () => {
    //     await userStore.remove(String(testUser.id));
    //     await productStore.remove(Number(testProduct.id));
    // });
    

    it('should have an index method', () => {
        expect(store.index).toBeTruthy();
    });

    it('should have a show method', () => {
        expect(store.show).toBeTruthy();
    });

    it('should have a create method', () => {
        expect(store.create).toBeTruthy();
    });

    it('should have an update method', () => {
        expect(store.update).toBeTruthy();
    });

    it('should have an addProduct method', () => {
        expect(store.addProduct).toBeTruthy();
    });

    it('should have a getCurrentOrderByUserId method', () => {
        expect(store.getCurrentOrderByUserId).toBeTruthy();
    });

    it('should have a getCompletedOrdersByUserId method', () => {
        expect(store.getCompletedOrdersByUserId).toBeTruthy();
    });

    it('create method should create a new order', async () => {
        const response = await store.create({
            user_id: Number(testUser.id),
            status: OrderStatus.PENDING
        });

        console.log(`Response: ${Object.values(response)}`);

        expect(response.status).toEqual(OrderStatus.PENDING);
        expect(Number(response.user_id)).toEqual(testUser.id!);
    });

    it('index method should return a non-empty list of orders', async () => {
        const response = await store.index();

        expect(response.length).toBeGreaterThan(0);
    });

});