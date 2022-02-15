import { OrderStore } from'../../models/order';

const store = new OrderStore();

describe('Order model', ()=> {
    it('should have an index method', ()=> {
        expect(store.index).toBeDefined();
    });
    
    it('Should have a show method', ()=> {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', ()=> {
        expect(store.create).toBeDefined();
    });

    it('should have an addProduct method', ()=> {
        expect(store.addProduct).toBeDefined();
    });

    it('should have an update method', ()=> {
        expect(store.update).toBeDefined();
    });

    it('should have a delete method', ()=> {
        expect(store.remove).toBeDefined();
    });
});