create table order_products(
    id serial primary key,
    order_id bigint references orders(id),
    product_id bigint references products(id),
    quantity integer
);