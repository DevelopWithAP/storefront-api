import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('Should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.remove).toBeDefined();
    });

})