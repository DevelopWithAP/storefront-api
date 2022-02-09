import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore  } from '../../models/product';

const request = supertest(app);

const userStore = new UserStore();
const productStore = new ProductStore();

const mockProduct: Product = {
    id: 1,
    name: 'Phone',
    price: 299.99
};

let token: string

xdescribe('Testing /products endpoint', () => {
    beforeAll(async () => {
        const response = await request.post('/users/login')
        .send({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: process.env.POSTGRES_PASSWORD_TEST as string
        });
        token = response.body;
        console.log(token);
    });
    it('should respond with 200 and the correct product', async () => {
        const response = await request.post('/products')
        .send(mockProduct)
        .set('Authorization', `Bearer ${token}`);

        let product: Product = response.body;

        expect(response.status).toBe(200);
        expect(product).toBeDefined();
    });
});

    // let token: string;

    // const testUser: User = {
    //     id: 1,
    //     firstName: 'Store',
    //     lastName: 'Dev',
    //     password: 'testing123'
    // };

    // beforeAll(async () => {
    //     const response = await request.post('/users')
    //     .send(testUser);
        
    //     token = response.body.token;
    // });

    // it('should create a new product', async () => {
    //     await request.post('/products')
    //     .send({
    //         id: 1,
    //         name: 'Watch',
    //         price: 199.99,
    //     })
    //     .set('Authorization', 'bearer ' + token)
    //     .expect(200);
    // });

    // it('should get a list of all products', async () => {
    //     await request.get('/products')
    //     .set('Authorization', 'bearer ' + token)
    //     .expect(200);
    // });

    // it('should get a product of id 1', async () => {
    //     await request.get('/products/1')
    //     .set('Authorization', 'bearer ' + token)
    //     .expect(200)
    // });  
    
    // it('should delete a product of id 1', async () => {
    //     await request.delete('/products/1')
    //     .set('Authorization', 'bearer ' + token)
    //     .expect(200);
    // });

    // it('should update update a product of id 1', async () => {
    //     await request.put('/products/1')
    //     .send({
    //         id: 1,
    //         name: 'Watch',
    //         price: 209.99
    //     })
    //     .set('Authorization', 'bearer ' + token)
    //     expect(200);
    // });

