import { Certificate } from 'crypto';
import { UserStore, User } from '../../models/user';

const store = new UserStore();
const testPassword: string = process.env.POSTGRES_PASSWORD_TEST as string;

describe('User Model', () => {

    const user: User = {
        first_name: 'Store0',
        last_name: 'Dev0',
        password: testPassword 
    };

    const createUser = async (user:User) => {
        return store.create(user);
    };
    const deleteUser = async (id:string) => {
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

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeTruthy();
    });

    it('create method should add a new user', async () => {
        const response = await createUser(user);

        expect(response.first_name).toBe(user.first_name);
        expect(response.last_name).toBe(user.last_name);

        await deleteUser(String(response.id));
    });

    it('index method should return a list of users', async () => {
        const createdUser: User = await createUser(user);
        const response = await store.index();

        expect(response.length).toBeGreaterThan(0);

        await deleteUser(String(createdUser.id));
    });

    it('show method should retrieve the correct user', async () => {
        const newUser: User = await createUser(user);

        const response = await store.show(String(newUser.id));

        expect(response.first_name).toBe(newUser.first_name);
        expect(response.last_name).toBe(newUser.last_name);


        await deleteUser(String(newUser.id));
    });

    it('update method should update user information', async () => {
        const userToUpdate: User = await createUser(user);
        const updateDetails : User = {
            first_name: 'Store1',
            last_name: 'Dev1',
            password: testPassword
        };

        const response = await store.update(String(userToUpdate.id), updateDetails);

        expect(response.first_name).toEqual(updateDetails.first_name);
        expect(response.last_name).toEqual(updateDetails.last_name);

        await deleteUser(String(userToUpdate.id));
    });

    it('remove method should remove the user', async () => {
        const newUser: User = await createUser(user);

        const response = await store.remove(String(newUser.id));

        expect(response.id).toBe(newUser.id);
    });

    it('authenticate method should authenticate the user', async () => {
        const userToAuthenticate: User = await createUser(user);

        const response = await store.authenticate('Store0', 'Dev0', testPassword);

        expect(response?.first_name).toEqual('Store0');
        expect(response?.last_name).toEqual('Dev0');
    });
});
