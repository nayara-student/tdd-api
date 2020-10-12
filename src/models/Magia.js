const { Schema, model } = require('mongoose');

const MagiaSchema = new Schema({
    magia: String,
    tipo: String,
    efeito: String
})

module.exports = model('Magia', MagiaSchema);