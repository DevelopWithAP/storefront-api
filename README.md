# Storefront Backend Project

## Aim
The aim of this project was to create a RESTful API back-end for an imaginary store.

## Technologies
* ``TypeScript`` to reduce type errors.
* ``Postgres`` for the database.
* ``Node.js`` as a runtime environment.
* ``Express`` for the application routing.
* ``bcrypt`` for password security.
* ``dotenv`` from npm for managing environment variables.
* ``db-migrate`` from npm for migrations.
* ``jsonwebtoken`` from npm for working with JWTs.
* ``jasmine`` and ``supertest`` from npm for testing.

### Functionality
The application supports the following actions:
* User registration and authentication
* CRUD operations for Products and Orders
* Ability to add products to specific orders. 

### RESTful routes:
#### Users:
* ``GET /users`` returns all registered users (authentication required).
* ``GET /users/:id`` returns the user with the specified id (authentication required).
* ``POST /users`` creates a new user.
* ``PUT /users/:id`` updates user details (authentication required).
* ``DELETE /users/:id`` deletes the user with the specified id from the database.

#### Products:
* ``GET /products`` returns all the avalable products.
* ``GET /products/:id`` returns the products with the specified id.
* ``POST /products`` creates a new product.
* ``PUT /products/:id`` updates product details (authentication required).
* ``DELETE /products/:id`` deletes the product from the database (authentication required).

#### Orders:
N.B: Authentication required for ALL of the following routes
* ``GET /orders`` returns all orders.
* ``GET /orders/:id`` returns the order with the specified id.
* ``GET /orders/current/:user_id`` returns the current order for the user of id ``user_id``.
* ``GET /orders/completed/:user_id`` returns the completed orders for the user of id ``user_id``.
* ``POST /orders`` creates a new order.
* ``POST /orders/:id/products`` adds a new product to the current order.
* ``PUT /orders/:id`` updates the current order.
* ``DELETE /orders/:id`` deletes the current order.

## Database Schema
### Users table:
#### Contains user information
| Column | Type | 
|--------|------|
| id     | integer|
| first_name | string (64) |
| last_name | string (64) |
| password | string (varying) |

### Products table:
#### Contains product information
| Column | Type | 
|--------|------|
| id | integer|
| name | string (64) |
| price | float |

### Orders table:
#### Contains order information
| Column | Type | 
|--------|------|
| id | integer |
| user_id | integer | 
| status | string (varying) | 

### Order-products table:
#### Intermediary table that represents the product quantities via product id in the order and does not directly correspond to any models.
| Column | Type |
|--------|------|
| id | integer |
| order_id | integer | 
| product_id | integer |
| quantity | integer |



## Dependencies
A list of the project's dependencies may be found in the ```package.json``` file.

## Installation
* Insall the dependencies required by running ```npm install``` or ```yarn```.
* Setup postgres image inside docker container
* Start docker container using ``docker-compose.yml`` which contains information related to postgres image sudo ``docker-compose up``
* In a bash terminal within the docker container execute ``sudo docker exec -i -t <docker_container_name> bash``
* Login to the Postgres server running on port 5432 (default) by executing ```psql -U <postgres_user>```
* Create database for development and testing by executing ```CREATE DATABASE store;``` and ```CREATE DATABASE store_test;``` respectively.
* Create a new database user and grant the user access to the database.
* Connect to the database by executing ```\c <database_name> <database_user>;```.
* Execute ``\dt`` to display the tables.
  N.B.: Until migrations are run the output should be ```No relations found```.
* Please refer to Postgres documentation if in doubt.

### Environment variables
```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=store_dev
POSTGRES_PASSWORD=''
POSTGRES_PASSWORD_TEST=''
ENV=dev
BCRYPT_PASSWORD=''
SALT_ROUNDS=10
TOKEN_SECRET=''
```
The ```''``` signify the parameters to be set.

### Migrations 
The ``db-migrate up`` run thedatabase migrations.

### Serving the application
* ``yarn build`` or ``npm run build`` will produce the build directory.
* ``yarn start`` or ```npm run start``` will start the development server.
* ```yarn watch``` or ```npm run watch``` will start the production server.
* The application should be running on port 3000.

### Testing
To test the application execute the following command:
* ``yarn test`` or ``npm run test``.
