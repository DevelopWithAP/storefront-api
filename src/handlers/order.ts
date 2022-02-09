import { Request, Response, Application } from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import { Order, OrderStore, OrderProduct, OrderStatus } from '../models/order';

const store = new OrderStore();

const index = async(_req: Request, res: Response): Promise<void> => {
    try {
        res.json(await store.index());
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const show = async(req: Request, res: Response): Promise<void> => {
    try {
        res.json(await store.show(parseInt(req.params.id)));
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    const newOrder: Order = {
        user_id: req.body.user_id,
        status: OrderStatus.PENDING
    };

    try {
        res.json(await store.create(newOrder));
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const addProduct = async (req: Request, res: Response): Promise<void> => {
    const newOrderProduct: OrderProduct = {
        order_id: req.params.id,
        product_id: req.params.product_id,
        quantity: parseInt(req.body.quantity)
    }
    try {
        res.json(await store.addProduct(newOrderProduct));
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    const updatedOrder: Order = {
        id: parseInt(req.params.id),
        user_id: req.body.user_id,
        status: req.body.status
    };

    try {
        res.json(await store.update(updatedOrder));
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



const orderRoutes = (app: Application): void => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.post('/orders/:id/products', addProduct);
    app.put('/orders/:id', update);
    app.delete('/orders/:id', remove);
}

export default orderRoutes;