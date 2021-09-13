const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome: String,
    codigo_barras: String,
    valor: Number,
    caracteristica: String,
    unidade_medida: String,
    marca: String,
    grupo: String,
});

const products = mongoose.model('Products', DataSchema);

module.exports = products;