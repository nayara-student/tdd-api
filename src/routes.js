const { Router } = require('express');

const UserController = require('./controllers/UserController');
const MateriaController = require('./controllers/MateriaController');
const MagiaController = require('./controllers/MagiaController');
const SessionController = require('./controllers/SessionController');

const Auth = require('./middlewares/auth');

const routes = new Router();

routes.post('/usuarios/cadastrar', UserController.store);
routes.post('/usuarios/login', SessionController.store);
routes.post('/usuarios/logout', Auth.auth, SessionController.delete);

//todas as rotas que estiverem abaixo de routes.use() vão utilizar o middleware
routes.use(Auth.auth);

//cria uma materia para um aluno
routes.post('/materias', MateriaController.store);
//lista todas as materias, independente do aluno
routes.get('/materias', MateriaController.index);
//busca todas as materias de um aluno
routes.get('/materias', MateriaController.show);
//atualiza a materia de um aluno
routes.put('/materias/:materia_id', MateriaController.update);
//deleta a materia de um aluno
routes.delete('/materias', MateriaController.destroy);

//cria uma magia
routes.post('/magias', MagiaController.store);
//busca todas as magias
routes.get('/magias', MagiaController.index);

routes.use(Auth.authGroup(['admin']));

//lista todos usuários
routes.get('/usuarios', UserController.index);
//exclui um usuário
routes.delete('/usuarios/deletar', UserController.delete);

module.exports = routes;