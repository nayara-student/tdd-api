const Magia = require('../models/Magia');

class MagiaController{
    //cria uma magia
    async store(req, res){
        const { magia, tipo, efeito } = req.body;
        if (!magia || !tipo || !efeito) {
        	return res.status(400).send({ error: 'Dados insuficientes'});
    	}
        try{
            const spell = await Magia.findOne({ magia });
            if(!spell){
                const spell = await Magia.create({
                    magia,
                    tipo,
                    efeito
                });
                return res.status(201).json(spell);
            }else{
                return res.status(400).send({ error: 'Esta magia já existe'});
            }
        }catch(err){
            return res.status(500).send({error: 'Não foi possível adicionar magia'});
        }
    }

    //busca todas as magias
    async index(req, res){
        try{
            const spell = await Magia.find({});
            res.status(200).json(spell);
        }catch(err){
            return res.status(500).send({error: 'Erro ao buscar magias'})
        }
    }
}

module.exports = new MagiaController();