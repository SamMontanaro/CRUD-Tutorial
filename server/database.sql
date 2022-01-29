CREATE DATABASE pernstack;

CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(255),
    ingredients text[]
);