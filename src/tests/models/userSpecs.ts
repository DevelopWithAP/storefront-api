import { doesNotMatch } from 'assert/strict';
import { UserStore, User } from '../../models/user';

const store = new UserStore();
let user: User = {
    first_name: 'Store',
    last_name: 'Dev',
    password: process.env.POSTGRES_PASSWORD_TEST as string
};

xdescribe('User model', ()=> {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a new user', async () => {
        const result = await store.create(user);

        expect(result.first_name).toEqual('Store');
        expect(result.last_name).toEqual('Dev');
    });

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('authenticate method should correctly authenticate User', async () => {
        const result = await store.authenticate('Store', 'Dev', process.env.POSTGRES_PASSWORD_TEST as string);

        expect(result).not.toBeNull();
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a non-empty list of User objects', async () => {
        const result = await store.index();

        expect(result.length).toBeGreaterThan(0);
    });

    it('should have a show method', async () => {
        expect(store.show).toBeDefined();
    });

    it('show method should identify the user', async () => {
        const result = await store.show('87');

        expect(result.first_name).toEqual('Store');
        expect(result.last_name).toEqual('Dev');
    });

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

    it('update method should correctly update User information', async () => {
        const result = await store.update('81', {
            first_name: 'Store',
            last_name: 'Dev0',
            password: process.env.POSTGRES_PASSWORD_TEST as string
        });

        expect(result.last_name).toEqual('Dev0');
    });

    it('should have a delete method', () => {
        expect(store.remove).toBeDefined();
    });

    it('delete method should remove the User model', async () => {
        const result = await store.remove('84');

        expect(result.id).toEqual(84);
    });
});
