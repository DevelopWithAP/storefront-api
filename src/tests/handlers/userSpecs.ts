import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';

const request = supertest(app);

const users: User[] = [
    {
        firstName: 'Store',
        lastName: 'Dev0',
        password: 'testing123'
    },
    {
        firstName: 'Store',
        lastName: 'Dev1',
        password: 'testing123'
    },
];

describe('Testing /user endpoints', () => {
    let token: string;

    it ('POST to /users should respond with 200 OK', async () => {
        const response = await request.post('/users')
        .send(users[0]);
        expect(response.status).toEqual(200);

        token = response.body;

        console.log('Token: ', token);
    });

    it ('POST to /users/login should respond with 200 OK', async () => {
        const response = await request.post('/users/login')
        .send(users[0])
        .set('Accept', 'application/json');

        token = 'Bearer' + response.body;

        expect(response.status).toEqual(200);
    });

    it('GET to /users should respond with 200 OK', async () => {
        const response = await request.get('/users')
        .set('Authorization', 'bearer' + token);
        expect(response.status).toBe(200);

        console.log('Response status: ', response.status);
    });

    

    xit ('GET to /users without valid credentials should respond with 401 Forbidden', async() => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    });
})

