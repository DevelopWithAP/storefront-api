import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user';
import productRoutes from './handlers/product';
import orderRoutes from './handlers/order';



const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function (_req: Request, res: Response) {
    res.send(`<h2> Server started </h2>`);
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
});

export default app;
