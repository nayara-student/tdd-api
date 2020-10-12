const Materia = require('../models/Materia');
const User = require('../models/User');

class MateriaController{
    //busca todas as materias
    async index(req, res){
        try{
            const materia = await Materia.find({});
            res.status(200).json(materia);
        }catch(err){
            return res.status(500).send({error: 'Erro ao buscar matérias'});
        }
        
    }

    //busca todas as materias do aluno
    async show(req, res){
        const { user_id } = req.headers;
        try{
            const materia = await Materia.find({ user: user_id });
            return res.status(200).json(materia);
        }catch(err){
            return res.status(500).send({error: 'Erro ao listar as matérias do aluno'});
        }
    }

    //cadastra uma materia para o aluno
    async store(req, res){
        const { nome, professor, livro } = req.body;
        const { user_id } = req.headers;
        try{
            const materia = await Materia.create({
                user: user_id,
                nome,
                professor,
                livro
            });
            return res.status(201).json(materia);
        }catch(err){
            return res.status(500).send({error: 'Não foi possível cadastrar a matéria'});
        }
    }

    //atualiza a materia do aluno
    async update(req, res){
        const { materia_id } = req.params;
        const { nome, professor, livros} = req.body;
        const { user_id } = req.headers;

        try{
            const user = await Materia.findById(user_id);
            const materias = await Materia.findById(materia_id);

            /*se o usuario logado for diferente do usuario cadastrado na materia, 
            retorna erro: 'nao autorizado' */
            if(String(user._id) !== String(materias.user)){
                return res.status(401).json({error: 'Não autorizado'});
            }

            await Materia.updateOne({_id: materia_id},{
                nome, professor, livro
            });

            return res.status(200).send({msg: 'Matéria alterada com sucesso'});
        }catch(err){
            return res.status(500).send({error: 'Não foi possível alterar a matéria'});
        }
    }

    //deleta a materia do aluno
    async destroy(req, res){
        const { materia_id } = req.body;
        const { user_id } = req.headers;
        try{
            const user = await Materia.findById(user_id);
            const materias = await Materia.findById(materia_id);
            
            await Materia.findByIdAndDelete({_id: materia_id});

            return res.status(200).json({msg: 'Matéria excluída com sucesso'});
        }catch(err){
            return res.status(500).send({error: 'Não foi possível excluir a matéria'});
        }
    }
}

module.exports = new MateriaController();