const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const authConfig = require('../config/auth.json');

const generateToken = (user_id, user_group) => {
    return jwt.sign({ _id: user_id, group: user_group }, authConfig.secret,{
        expiresIn: authConfig.expiresIn
    })
}

class SessionController{
    //faz login
    async store(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).send({ error: 'Dados insuficientes' });
        } 
        try{
            const user = await User.findOne({ email }).select('+senha');
            if(!user){
                return res.status(400).send({error: 'E-mail não cadastrado'});
            }else{
                const senha_valida = await bcrypt.compare(senha, user.senha);
                if(!senha_valida){
                    return res.status(400).send({error: 'Senha incorreta'});
                }else{
                    user.senha = undefined;
                    const token = generateToken(user._id, user.group);
                    await User.findByIdAndUpdate({_id: user._id}, {token: token});
                    return res.status(200).json({
                        user:{ _id: user._id},
                        token: token
                    });
                }
            }
        }catch (err){
            return res.status(500).send({error: 'Erro ao realizar autenticação'});
        }
    }

    //faz logout
    async delete(req, res){
        const user_id = req.user_id;
        try{
            await User.findByIdAndUpdate({_id: user_id}, {token: null});
            //Não tem como deixar o token inválido por conta própria, ele vai ficar válido
            //até a data do expiresIn
        }catch (err){
            res.status(500).send({error: 'Erro ao realizar logout'});
        }
    }
} 

module.exports = new SessionController();