import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

beforeAll(async () => {
    const product: Product = {
        name: 'Product 1',
        price: 12
    };

    await store.create(product);
})

xdescribe('Product model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(2);
        expect(result.id).toBe(2);
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a new product', async () => {
        const result = await store.create({
            name: 'Product 1',
            price: 12
        });
        expect(result).toBeDefined();
        expect(result.name).toEqual('Product 1');
    });

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

    it('update method should correctly update product details', async () => {
        const result = await store.update({
            id: 2,
            name: 'Updated Product 2',
            price: 8
        });
        expect(result).toBeDefined();
        expect(result).toEqual({
            id: 2,
            name: 'Updated Product 2',
            price: 8
        });
    });


    it('should have a delete method', () => {
        expect(store.remove).toBeDefined();
    });

    it('delete method should remove the product', async () => {
        const result = await store.remove(6);
        expect(result).toBeDefined();
        expect(result.id).toEqual(6);
    });

})