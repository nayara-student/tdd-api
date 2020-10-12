const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, select: false},
    nome:  { type: String, required: true},
    group: { type: String, require: true, enum: ['user', 'admin'], default: 'user'},
    token: { type: String, default: null}
})

UserSchema.pre('save', async function(next){
    let user = this;
    if(!user.isModified('senha') || !user.isNew){
        return next();
    }else{
        user.senha = await bcrypt.hash(user.senha, 10);
        return next();
    }
});

module.exports = model('User', UserSchema);