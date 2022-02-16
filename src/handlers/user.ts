import { Request, Response, Application } from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/verifyAuthToken';
import jwt from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET;
let token: string;
const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await store.index();
        res.json(users);
    } catch (error) {
        res.status(400).json(error);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = await store.show(req.body.id);
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};

const create = async (_req: Request, res: Response): Promise<void> => {
    const user: User = {
        first_name: 'Store',
        last_name: 'Dev',
        password: 'testing123'
    };
    try {
        const created: User = await store.create(user);
        if (secret) {
            token = jwt.sign({ user: created }, secret);
            res.json(token);
        }
    } catch (error) {
        res.status(400).json(error);
    }

};

const update = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    };
    try {
        const updatedUser = await store.update(req.params.id, user);
        res.json(updatedUser);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const removedUser = await store.remove(req.params.id);
        res.status(200).json(removedUser);
    } catch (error) {
        res.status(400).json(error);
    }
}

const authenticate = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    };
    try {
        const loggedIn: User | null = await store.authenticate(user.first_name, user.last_name, user.password);
        if (loggedIn && secret) {
            token = jwt.sign({user: loggedIn}, secret);
            res.json(token);
        }
        else {
            res.send('Invalid credentials');
        }
    } catch (error) {
        res.status(401).json({error: error})
    }
};



const userRoutes = (app: Application): void => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.put('/users/:id', verifyAuthToken, update);
    app.delete('/users/:id', verifyAuthToken, remove);
    app.post('/users/login', authenticate);

}

export default userRoutes;