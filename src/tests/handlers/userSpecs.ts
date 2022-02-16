import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';

const request = supertest(app);

const users: User[] = [
    {
        first_name: 'Store',
        last_name: 'Dev0',
        password: 'testing123'
    },
    {
        first_name: 'Store',
        last_name: 'Dev1',
        password: 'testing123'
    },
];

xdescribe('Testing /user endpoints', () => {
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
    });

    it ('GET to /users/1 should respond with 200 OK', async () => {
        const response = await request.get('/users/1')
        .set('Authorization', `bearer ${token}`);
        expect(response.status).toEqual(200);
    });

    it ('GET to /users without valid credentials should respond with 401 Forbidden', async() => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    });

    it('DELETE to /users/1 should respond with 200 OK', async() => {
        const response = await request.delete('/users/1')
        .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('PUT to /users/1 should respond with 200 OK', async () => {
        const response = await request.put('/users/1')
        .set('Authorization', `bearer ${token}`);
        expect(response.status).toBe(200);
    });
})

