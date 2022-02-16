import { UserStore, User } from '../../models/user';

const store = new UserStore();

beforeAll(async () => {
    const user: User = {
        first_name: 'Store',
        last_name: 'Dev',
        password: process.env.POSTGRES_PASSOWRD as string
    };
});

xdescribe('User model', ()=> {

    it('should have an index method', ()=> {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();

        expect(result.length).toBeGreaterThan(0);
    });
    
    it('should have a show method', ()=> {
        expect(store.show).toBeDefined();
    });

    it('show method should return the correct user', async () => {
        const result = await store.show('1');
        expect(result.id).toEqual(1);
    })

    it('should have a create method', ()=> {
        expect(store.create).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await store.create({
            first_name: 'Jason',
            last_name: 'Bourne',
            password: process.env.POSTGRES_PASSWORD as string
        });
        expect(result).toBeDefined();
        expect(result.first_name).toEqual('Jason');
    });

    it('should have an update method', ()=> {
        expect(store.update).toBeDefined();
    });

    it('update method should update user information', async () => {
        const result = await store.update('3', {
            id: 3,
            first_name: 'Store',
            last_name: 'Dev0',
            password: process.env.POSTGRES_PASSWORD as string
        });
        expect(result).toBeDefined();
        expect(result).toEqual({
            id: 3,
            first_name: 'Store',
            last_name: 'Dev0',
            password: process.env.POSTGRES_PASSWORD as string
        });
    });

    it('should have a delete method', ()=> {
        expect(store.remove).toBeDefined();
    });

    it('delete method should remove a user', async () => {
        const result = await store.remove('15');

        expect(result).toBeDefined();
        expect(result.id).toEqual(15);
        expect(result.first_name).toEqual('Store');
        expect(result.last_name).toEqual('Dev');
    })

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('should correctly authenticate a user', async() => {
        const result = await store.authenticate('Jason', 'Bourne', process.env.POSTGRES_PASSWORD as string);
        expect(result).not.toBeNull();
    });
});
