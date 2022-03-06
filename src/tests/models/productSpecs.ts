import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

let product: Product = {
    name: 'Product_1',
    price: 10
};

xdescribe('Product model', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should createa new product', async () => {
        const result = await store.create(product);

        expect(result.name).toEqual(product.name);
        expect(result.price).toEqual(product.price);
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a non-empty list of Product objects', async () => {
        const result = await store.index();

        expect(result.length).toBeGreaterThan(0);
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('show method should retrieve the correct product', async () => {
        const result = await store.show(92);

        expect(result.id).toEqual(92);
        expect(result.name).toEqual('Product_1');
    });

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

    it('update method should should correctly update product information', async () => {
        const result = await store.update({
            id: 92,
            name: 'Product_1',
            price: 11
        });
        expect(result.price).toEqual(11);
    });

    it('should have a delete method', () => {
        expect(store.remove).toBeDefined();
    });

    it('delete method should remove the correct product', async () => {
        const result = await store.remove(93);

        expect(result.id).toEqual(93);

        console.log(`Call to delete/93 returns: ${result.id}`);
    });
})