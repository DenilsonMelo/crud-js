const Product = require('../models/product.model'); 

module.exports = {
    async index(request, response){
        const product = await Product.find();
        response.json(product);
    },

    async create(request, response){
        const {nome, codigo_barras, valor, caracteristica, unidade_medida, marca, grupo} = request.body;

        let data = {};
        let product = await Product.findOne({codigo_barras});
        
        if(!product){
            data = {nome, codigo_barras, valor, caracteristica, unidade_medida, marca, grupo};
            product = await Product.create(data);
            return response.status(200).json(product);
        }else{
            return response.status(500).json(product);
        }
    }, 
    
    async details(request, response){
        const { _id } = request.params;
        const product = await Product.findOne({_id});
        response.json(product);
    },

    async update(request, response){
        const { _id, nome, codigo_barras, valor, caracteristica, unidade_medida, marca, grupo } = request.body;
        const data = { nome, codigo_barras, valor, caracteristica, unidade_medida, marca, grupo };

        const product = await Product.findByIdAndUpdate({_id}, data, { new: true });

        response.json(product);
    }
}