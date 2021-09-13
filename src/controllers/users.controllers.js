const User = require('../models/user.model'); 
const jwt = require('jsonwebtoken');

const secret = 'visdom';

module.exports = {
    async index(request, response){
        const user = await User.find();
        response.json(user);
    },

    async login(request, response){
        const { user } = request.body;
        User.findOne({user: user}, function(error, user){
            if(error){
                console.log(error);
                response.status(200).json({erro: "Erro no servidor. Por favor, tente novamente"});
            }else if (!user){
                response.status(200).json({status:2, error: 'Usuário não encontrado no banco de dados'});
            }else{
                if(error){
                    response.status(200).json({error: "Erro no servidor. Por favor, tente novamente"});
                }else {
                    const payload = { user };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h'
                    })
                    response.cookie('token', token, {httpOnly: true});
                    response.status(200).json({status:1, auth:true, token:token, id_client: user._id });
                }
            }
        })
    },

    async checktoken(request, response){
        const token = request.body.token || request.query.token || request.cookies.token || request.headers['x-access-token'];

        if(!token){
            response.json({status: 401, message: 'Não autorizado! Token inexistente!'});
        } else{
            jwt.verify(token, secret, function(error, decode){
                if(error){
                    response.json({status: 401, message: 'Não autorizado! Token inválido!'});
                    console.log(token)
                } else{
                    response.json({status: 200});
                }
            })
        }
    }
}