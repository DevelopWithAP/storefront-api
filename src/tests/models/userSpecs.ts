import { UserStore, User } from '../../models/user';

const store = new UserStore();
const testPassword: string = process.env.POSTGRES_PASSWORD_TEST as string;

describe('User model', ()=> {

    beforeEach(async () => {
        await store.create({
            id: 1,
            first_name: 'Store',
            last_name: 'Dev0',
            password: testPassword
        });
        await store.create({
            id: 2,
            first_name: 'Store',
            last_name: 'Dev1',
            password: testPassword
        })
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a new user', async () => {
        const id = 3;
        const first_name = 'Store';
        const last_name = 'Dev2';
        const password = testPassword;

        const returnedUser = await store.create({
            id: id,
            first_name: first_name,
            last_name: last_name,
            password: password
        });

        expect(returnedUser.first_name).toEqual('Store');
        expect(returnedUser.last_name).toEqual('Dev2');
        expect(returnedUser.id).toEqual(id);
    });



});
