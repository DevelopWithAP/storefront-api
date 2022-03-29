import { User, UserStore } from '../../models/user';
import { Order, OrderStatus, OrderStore, OrderProduct } from '../../models/order';
import { Product, ProductStore } from '../../models/product';

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const testPassword: string = process.env.POSTGRES_PASSWORD_TEST as string;


describe('Order Model: ', () => {

    let order: Order;
    let userId: number;
    let productId: number;

    const createOrder = async (o: Order) => {
        return store.create(o);
    };

    const deleteOrder = async (orderId: number) => {
        return store.remove(orderId);
    };

    const createOrderProduct = async (op: OrderProduct) => {
        return store.addProduct(op);
    };

    beforeAll(async () => {
        const user: User =  await userStore.create({
            first_name: 'Test',
            last_name: 'User',
            password: testPassword
        });

        userId = user.id as number;

        const product: Product = await productStore.create({
            name: 'Test Product',
            price: 12.99
        });

        productId = product.id as number;

        order = {
            user_id: userId,
            status: OrderStatus.PENDING
        };

    });

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

    it('should have a removeAll method', () => {
        expect(store.removeAll).toBeTruthy();
    });

    it('create method should create a new order', async () => {
        const response: Order = await createOrder(order);
        
        expect(Number(response.user_id)).toEqual(userId);
        expect(response.status).toEqual('active');

        await deleteOrder(Number(response.id));
    });

    it('index method should return a non-empty list', async () => {
        const orderInDb: Order = await createOrder(order);
        const response = await store.index();

        expect(response).toContain(orderInDb);
    });

    it('show method should show the correct order', async () => {
        const orderInDb: Order = await createOrder(order);
        const orderInDbId: number = orderInDb.id as number; 

        const response = await store.show(orderInDbId);

        expect(Number(response.id)).toEqual(orderInDbId);
        expect(response.status).toEqual(OrderStatus.PENDING);
    });

    it('update method should correctly update order information', async () => {
        const orderToUpdate: Order = await createOrder(order);
        const orderToUpdateId: number = orderToUpdate.id as number;

        const response = await store.update({
            id: orderToUpdateId,
            user_id: orderToUpdate.user_id,
            status: OrderStatus.COMPLETE
        });

        expect(Number(response.id)).toEqual(orderToUpdateId);
        expect(response.status).toEqual(OrderStatus.COMPLETE);
    });

    it('remove method should remove the correct order', async () => {
        const orderToDelete: Order = await createOrder(order);
        
        const response = await store.remove(Number(orderToDelete.id));

        expect(Number(response.id)).toEqual(orderToDelete.id!);
        expect(response.user_id).toEqual(orderToDelete.user_id);
    });

    it('addProduct method should add a product to an order', async () => {
        const newOrder: Order = await createOrder(order);

        const response: OrderProduct = await createOrderProduct({
            order_id: String(newOrder.id),
            product_id: String(productId),
            quantity: 5
        });

        expect(response.order_id).toContain(String(newOrder.id));
        expect(response.quantity).toEqual(5);

    });

    it('getCurrentOrderByUserId method should retrieve the user\'s current order', async () => {
        const response = await store.getCurrentOrderByUserId(String(userId));

        expect(response.status).toEqual(OrderStatus.PENDING);
    });

    it('getCompletedOrdersByUserId method should return an array of orders with status ' + OrderStatus.COMPLETE, async() => {
        const response = await store.getCompletedOrdersByUserId(String(userId));
        const responseArray: Order | undefined = response.find(({status}) => status === OrderStatus.COMPLETE);

        expect(responseArray?.status).toEqual(OrderStatus.COMPLETE);
    });

});