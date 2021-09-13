const express = require('express');
const routes = express.Router();

const Product = require('../src/controllers/products.controllers');
const User = require('../src/controllers/users.controllers');

routes.get('/', Product.index);

routes.post('/api/products', Product.create);
routes.get('/api/products', Product.index);
routes.get('/api/products.details/:_id', Product.details);
routes.put('/api/products', Product.update);

routes.get('/api/users', User.index);
routes.post('/api/users/login', User.login);
routes.get('/api/users/checktoken', User.checktoken);

module.exports = routes;