//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// let Book = require('../app/models/book');

//Require the dev-dependencies
import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
let should = _should();
use(chaiHttp);
describe('/GET new-password', () => {
    it('it should generate a new password and GET a hint for that password', (done) => {
        request(server)
            .get('/new-password')
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.hint.should.be.a('string');
                res.body.hint.length.should.be.eql(8);
                done();
            });
    });
});

describe('/POST verify-password', () => {
    it('it should verify whether answer is same as password', (done) => {
        request(server)
            .post('/verify-password')
            .send({'hint': '15347298',
                'answer': '98765431'
            })
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(404);
                done();
            });
    });
});