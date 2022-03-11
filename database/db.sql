CREATE DATABASE productdb;

use productdb;

CREATE TABLE product(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(400) NOT NULL,
    price DECIMAL,
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

describe product;