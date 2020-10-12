const app = require('../server');

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
const base_url = 'http://localhost:3000';

chai.use(chaiHttp);

describe('Testes controllers User e Session', ()=>{
    let user = {
        email: 'banana@gmail.com',
        senha: '123',
        nome: 'Teste'
    }
    
    //se retornar Error: Timeout of 2000ms exceeded em qualquer it use async e retire o done();
    it('Email não existente. Não deveria fazer login', async ()=>{
        chai.request(base_url)
        .post('/usuarios/login/')
        .send({email: 'naoexiste@gmail.com', senha: '123'})
        .end((err, res)=>{
            expect('email').to.be.a('string')
            expect('senha').to.be.a('string')
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('error')
        })
    })

    it('Senha incorreta. Não deveria fazer login', async ()=>{
        chai.request(base_url)
        .post('/usuarios/login/')
        .send({email: 'banana@gmail.com', senha: '0000'})
        .end((err, res)=>{
            expect('email').to.be.a('string')
            expect('senha').to.be.a('string')
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('error')
        })
    })

    it('Não enviou email. Não deveria fazer login', async ()=>{
        chai.request(base_url)
        .post('/usuarios/login/')
        .send({senha: '1234'})
        .end((err, res)=>{
            expect('senha').to.be.a('string')
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('error')
        })
    })

    it('Não enviou senha. Não deveria fazer login', async ()=>{
        chai.request(base_url)
        .post('/usuarios/login/')
        .send({email: 'banana@gmail.com'})
        .end((err, res)=>{
            expect('email').to.be.a('string')
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('error')
        })
    })

    it('Deveria fazer login', async ()=>{
        chai.request(base_url)
        .post('/usuarios/login/')
        .send({email: 'banana@gmail.com', senha: '123', nome: 'Teste'})
        .end((err, res)=>{
            expect('email').to.be.a('string')
            expect('senha').to.be.a('string')
            expect('nome').to.be.a('string')
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('user')
        	expect(res.body).to.have.property('token')
            expect(res.body.token).to.not.be.null
            expect(res.senha).to.be.undefined
        })
    })

    it('Não enviou email. Não deveria criar usuário', async ()=>{
        chai.request(base_url)
        .post('/usuarios/cadastrar/')
        .send({senha: '123', nome: 'Teste'})
        .end((err, res)=>{
            expect('nome').to.be.a('string')
            expect('senha').to.be.a('string')
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('error');
        })
    })

    it('Não enviou senha. Não deveria criar usuário', async ()=>{
        chai.request(base_url)
        .post('/usuarios/cadastrar/')
        .send({email: 'banana@gmail.com', nome: 'Teste'})
        .end((err, res)=>{
            expect('email').to.be.a('string')
            expect('nome').to.be.a('string')
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('error');
        })
    })

    it('Não enviou nome. Não deveria criar usuário', async ()=>{
        chai.request(base_url)
        .post('/usuarios/cadastrar/')
        .send({email: 'banana@gmail.com', senha: '1234'})
        .end((err, res)=>{
            expect('email').to.be.a('string')
            expect('senha').to.be.a('string')
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('error');
        })
    })

    it('Email já existe. Não deveria criar um usuário', async ()=>{
        chai.request(base_url)
        .post('/usuarios/cadastrar/')
        .send({email: 'nayaragb@gmail.com', senha: '123', nome: 'Outro Nome'})
        .end((err, res)=>{
            expect('email').to.be.a('string')
            expect('senha').to.be.a('string')
            expect('nome').to.be.a('string')
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('error')
        })
    })

    it('Deveria criar um usuário', async ()=>{
        chai.request(base_url)
        .post('/usuarios/cadastrar/')
        .send({email: 'banana1@gmail.com', senha: '123', nome: 'Teste'})
        .end((err, res)=>{
            expect('email').to.be.a('string')
            expect('senha').to.be.a('string')
            expect('nome').to.be.a('string')
            expect(res).to.have.status(201)
            expect(res.body.token).to.be.null
            expect(res.senha).to.be.undefined
        })
    })

    after(done =>{
        let Usuario = require('../models/User');
        Usuario.deleteMany({email: 'banana@gmail.com', email: 'banana1@gmail.com'})
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