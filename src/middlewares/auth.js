const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const User = require('../models/User');

module.exports = {
    auth: (req, res, next) => {
        const token_header = req.headers.token;
    
        if(!token_header){
            return res.status(401).send({error: 'Token ausente'}); 
        }
        try{
            const decoded = jwt.verify(token_header, authConfig.secret);
            req.user_id = decoded._id;
            req.user_group = decoded.group;
            console.log(decoded);
            return next();
        }catch(err){
            return res.status(401).send({error: 'Token inválido'});
        }
    },
    
    authGroup: (role) => {
        return function(req, res, next){
            /* const user = User.group; */

            if(role != null && role.includes(req.user_group)){
                next();
            }else{
                return res.status(403).send({error: 'Acesso negado'});
            }
        }
    }
}

/* module.exports = new Auth(); */