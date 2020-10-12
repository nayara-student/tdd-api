/*
index: lista todos; show: lista apenas um; update: altera um; store: cria um; destroy: exclui um
*/
const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');

class UserController {
    //cria um usuário
    async store(req, res) {
        const { email, senha, nome } = req.body;
        if (!email || !senha || !nome) {
            return res.status(400).send({ error: 'Dados insuficientes'});
        } 
        try {
            let user = await User.findOne({ email });
            if (!user) {
                user = await User.create(req.body);
                user.senha = undefined; //para não devolver a senha
                return res.status(201).json(user);
            }else{
                return res.status(400).send({ error: 'E-mail já cadastrado'});
            }
        }catch (err){
            return res.status(500).send({error: 'Erro ao cadastrar usuário'});
        }
    }

    //lista todos usuários, somente admin
    async index(req, res) {
        try {
            const users = await User.find({});
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).send({ error: 'Erro na consulta de usuários' });
        }
    }

    //deleta um usuário, somente admin
    async delete(req, res) {
        const { email } = req.body;
        try{
            const user = await User.findOneAndDelete({ email });
            return res.status(200).send({ message: 'Usuário excluído com sucesso' });
        }catch (err){
            return res.status(500).send({ error: 'Não foi possível excluir o usuário' });
        }
    }

    //atualiza um usuário
    /* async update(req, res){
        const { email, oldPassword } = req.body;
        try{
            const user = await User.findById({ _id: user._id });

            if(email !== user.email){
                const userExists = await User.findOne({ email });
                if(userExists){
                    return res.status(400).send({error: 'E-mail já existe'});
                }
            }

            const senha_valida = await bcrypt.compare(oldPassword, user.senha);
            if(oldPassword && !(await user.senha_valida)){
                return res.status(401).json({error: 'Senha incorreta'});
            }

            user = await user.update(req.body);
            return res.json({user});
        }catch(err){
            return res.status(500).send({error: 'Não foi possível alterar o usuário'});
        }
    } */

}

module.exports = new UserController();