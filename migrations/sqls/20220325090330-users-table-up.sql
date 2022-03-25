create table users (
    id serial primary key,
    first_name varchar(64) not null,
    last_name varchar(64) not null,
    password varchar
);