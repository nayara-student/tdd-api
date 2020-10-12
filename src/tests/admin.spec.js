const app = require('../server');

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
const base_url = 'http://localhost:3000';

chai.use(chaiHttp);

describe('Testes acesso a rota de admin - Autorização', ()=>{
    let admin = {
        email: 'adminteste@gmail.com',
        senha: '123',
        nome: 'Admin Teste',
        group: ['admin']
    }

    let user = {
        email: 'nayaragb@gmail.com',
        senha: '123',
        group: ['user']
    }

    it('Deveria acessar rota /usuarios', async()=>{
        chai.request(base_url)
        .get('/usuarios/')
        .send({admin})
        .end((err, res)=>{
            expect(admin.group).to.be.an('array').that.includes('admin')
        })
    })

    it('Não deveria acessar rota /usuarios', async()=>{
        chai.request(base_url)
        .get('/usuarios/')
        .send({user})
        .end((err, res)=>{
            expect(user.group).to.be.an('array').that.not.includes('admin')
        })
    })

    it('Deveria acessar rota /usuarios/deletar', async()=>{
        chai.request(base_url)
        .delete('/usuarios/deletar')
        .send({admin})
        .end((err, res)=>{
            expect(admin.group).to.be.an('array').that.includes('admin')
        })
    })

    it('Não deveria acessar rota /usuarios/deletar', async()=>{
        chai.request(base_url)
        .delete('/usuarios/deletar')
        .send({user})
        .end((err, res)=>{
            expect(user.group).to.be.an('array').that.not.includes('admin')
        })
    })

    it('Deveria acessar rota get /materias', async()=>{
        chai.request(base_url)
        .get('/materias/')
        .send({admin})
        .end((err, res)=>{
            expect(admin.group).to.be.an('array').that.includes('admin')
        })
    })

    it('Deveria acessar rota post /materias', async()=>{
        chai.request(base_url)
        .post('/materias/')
        .send({admin})
        .end((err, res)=>{
            expect(admin.group).to.be.an('array').that.includes('admin')
        })
    })

    it('Deveria acessar rota put /materias/:materia_id', async()=>{
        chai.request(base_url)
        .put('/materias/:materia_id')
        .send({user})
        .end((err, res)=>{
            expect(user.group).to.be.an('array').that.includes('user')
        })
    })

    it('Deveria acessar rota delete /materias', async()=>{
        chai.request(base_url)
        .delete('/materias/')
        .send({admin})
        .end((err, res)=>{
            expect(admin.group).to.be.an('array').that.includes('admin')
        })
    })

    it('Deveria acessar rota post /magias', async()=>{
        chai.request(base_url)
        .post('/magias/')
        .send({admin})
        .end((err, res)=>{
            expect(admin.group).to.be.an('array').that.includes('admin')
        })
    })

    it('Deveria acessar rota get /magias', async()=>{
        chai.request(base_url)
        .get('/magias/')
        .send({admin})
        .end((err, res)=>{
            expect(admin.group).to.be.an('array').that.includes('admin')
        })
    })

    after(done =>{
        let Usuario = require('../models/User');
        Usuario.remove({email: 'adminteste@gmail.com'})
        .then(ok =>{
            console.log('Dado(s) de teste resetado(s)');
            done();
        })
        .catch(error =>{
            console.log('Não foi possível remover dado(s) de teste');
            done(error);
        })
    })
})