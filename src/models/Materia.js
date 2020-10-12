const { Schema, model } = require('mongoose');

//Usuário cria suas matérias em Hogwarts
const MateriaSchema = new Schema({
    nome: String,
    professor: String,
    livro: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Materia', MateriaSchema);