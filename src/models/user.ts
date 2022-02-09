import client from '../database';
import bcrypt from 'bcrypt';

const saltRounds: string = process.env["SALT_ROUNDS"] as string;
const bcryptPassword: string = process.env["BCRYPT_PASSWORD"] as string;

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            const hash = bcrypt.hashSync(user.password + bcryptPassword, parseInt(saltRounds));
            const result = await conn.query(sql, [user.firstName, user.lastName, hash]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to create new user ${user.firstName}. Error: ${error}`);
        }
    }

    async update(id: string, user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE users SET first_name = $1, last_name = ($2), password = ($3) WHERE id=($4) RETURNING *';
            const result = await conn.query(sql, [user.firstName, user.lastName, user.password, id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to update user ${user.id}. Error: ${error}`)
        }
    }

    async remove(id: string): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete user ${id}. Error: ${error}`);
        }
    }

    async authenticate(firstName: string, lastName: string, password: string): Promise<User | null> {
        try {
          const conn = await client.connect();
          const sql =
            "SELECT * FROM users WHERE first_name=($1) AND last_name=($2)";
          const result = await conn.query(sql, [firstName, lastName]);
    
          if (result.rows.length) {
            const user = result.rows[0];
    
            if (bcrypt.compareSync(password + bcryptPassword, user.password)) {
              return user;
            }
          }
    
          return null;
        } catch (err) {
          throw new Error(`Cannot authenticate user ${lastName}, ${firstName}. Error: ${err}.`);
        }
      }
}
    
