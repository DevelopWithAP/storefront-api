import { Request, Response, Application } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/verifyAuthToken';


const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.json(await store.index());
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        res.json(await store.show(parseInt(req.params.id)));
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        }
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: Product = {
            id: parseInt(req.params.id),
            name: req.body.name,
            price: req.body.price,
        }
        res.json(await store.update(product));
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        res.json(await store.remove(parseInt(req.params.id)));
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const productRoutes = (app: Application): void => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.put('/products/:id', verifyAuthToken, update);
    app.delete('/products/:id', verifyAuthToken, remove);
}

export default productRoutes;

