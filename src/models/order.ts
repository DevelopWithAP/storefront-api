import client from '../database';

export enum OrderStatus {
  PENDING = 'active',
  COMPLETE = 'complete'
};

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProduct = {
  id?: number;
  order_id: string;
  product_id: string;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.user_id, order.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order for user ${order.user_id}. Error: ${err}`);
    }
  }

  async addProduct(addedProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [addedProduct.order_id, addedProduct.product_id, addedProduct.quantity]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Product with id ${addedProduct.product_id} could not be added to order with id ${addedProduct.order_id}. Error ${error}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE orders SET user_id = ($1), status = ($2) WHERE id=($3) RETURNING *';
      const result = await conn.query(sql, [order.user_id, order.status, order.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${order.id}. Error: ${err}`);
    }
  }

  async remove(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }


  async getCurrentOrderByUserId(user_id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `
        SELECT *
        FROM orders
        WHERE user_id=($1)
        ORDER BY id
        DESC LIMIT 1
        `;
      const result = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`No current orders for user: ${user_id}. Error ${error}`);
    }
  }

  async getCompletedOrdersByUserId(id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `
      SELECT *
      FROM orders
      WHERE user_id=($1)
      AND status=($2)
      `;
      const result = await conn.query(sql, [id, OrderStatus.COMPLETE]);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`No completed orders for user: ${id}. Error: ${error}`);
    }
  }
}