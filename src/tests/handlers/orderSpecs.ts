import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { Order, OrderStatus, OrderProduct, OrderStore } from '../../models/order';
import jwt from 'jsonwebtoken';

const request = supertest(app);
const uStore = new UserStore();
const oStore = new OrderStore();

let token: string;

xdescribe('Testing /orders endpoint', () => {

})