import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product model', () => {

    const product: Product = {
        name: 'Product_0',
        price: 9.99
    };

    const createProduct = async (p: Product) => {
        return store.create(p);
    };

    const deleteProduct = async (id: number) => {
        return store.remove(id);
    };

    it('should have an index method', () => {
        expect(store.index).toBeTruthy();
    });

    it('should have a show method', () => {
        expect(store.show).toBeTruthy();
    });

    it('should have a create method', () => {
        expect(store.create).toBeTruthy();
    });
    
    it('should have a remove method', () => {
        expect(store.remove).toBeTruthy();
    });

    it('should have an update method', () => {
        expect(store.update).toBeTruthy();
    });

    it('create method should add a new product', async () => {
        const newProduct: Product = await createProduct(product);

        const response = newProduct;

        expect(response.name).toBe(newProduct.name);
        expect(response.price).toBe(newProduct.price);

        await deleteProduct(Number(newProduct.id));
    });

    it('index method should return a list of products', async () => {
        const response = await store.index();

        expect(response.length).toBeGreaterThan(0);
    });

    it('show method should retrieve the correct product', async () => {
        const prod: Product = await createProduct(product);

        const response = await store.show(Number(prod.id));

        expect(response.name).toEqual(prod.name);
        expect(response.price).toEqual(prod.price);

        await deleteProduct(Number(prod.id));
    });

    it('update method should correctly update product information', async () => {
        const prodToUpdate: Product = await createProduct(product);
        const updateDetails: Product = {
            id: prodToUpdate.id,
            name: 'New_Product_0',
            price: 10.99
        };

        const response = await store.update(updateDetails);

        expect(response.name).toEqual(updateDetails.name);
        expect(response.price).toEqual(updateDetails.price);

        await deleteProduct(Number(prodToUpdate.id));
    });

    it('delete method should remove the correct product', async () => {
        const prodToRemove: Product = await createProduct(product);

        const response = await store.remove(Number(prodToRemove.id));

        expect(response.name).toEqual(prodToRemove.name);
        expect(response.price).toEqual(prodToRemove.price);
    });
})