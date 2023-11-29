const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();
const listOfPeople = require("./mocks/listOfPeople.json");
const onePerson = require("./mocks/onePerson.json");
const notFound = require("./mocks/notFound.json");
const responseObject = require("./mocks/responseObject.json");
this.get = sinon.stub(request, 'get');

describe('GET /persons/', () => {
    it('should return all persons', (done) => {
        this.get.yields(null, responseObject.success, JSON.stringify(listOfPeople));
        request.get(`http://localhost:3000/persons/`, (err, res, body) => {
            res.statusCode.should.eql(200);
            res.headers['content-type'].should.contain('application/json');
            body = JSON.parse(body);
            body[1].name.should.eql('Ricardo Calegaro');
            body[1].should.include.keys(
                'name', 'document', 'birthdate'
            );
            body.length.should.eql(2);
            done();
        });
    });
    it('should return not found', (done) => {
        this.get.yields(null, responseObject.notFound, JSON.stringify(notFound.notFoundList));
        request.get(`http://localhost:3000/persons/`, (err, res, body) => {
            res.statusCode.should.eql(404);
            res.headers['content-type'].should.contain('application/json');
            body = JSON.parse(body);
            body.message.should.eql('Pessoas não encontradas');
            body.should.not.include.keys(
                'name', 'document', 'birthdate'
            );
            body.should.include.keys(
                'message'
                );
                done();
            });
        });
    });
    
    describe('GET /persons/:document', () => {
        it('should return one person', (done) => {
            this.get.yields(null, responseObject.success, JSON.stringify(onePerson));
            request.get(`http://localhost:3000/persons/12345678900`, (err, res, body) => {
                res.statusCode.should.eql(200);
                res.headers['content-type'].should.contain('application/json');
                body = JSON.parse(body);
                body.name.should.eql('Andrey Lemos');
                body.should.include.keys(
                    'name', 'document', 'birthdate'
                );
                done();
            });
        });
        it('should return not found', (done) => {
            this.get.yields(null, responseObject.notFound, JSON.stringify(notFound.notFoundOne));
            request.get(`http://localhost:3000/persons/`, (err, res, body) => {
                res.statusCode.should.eql(404);
                res.headers['content-type'].should.contain('application/json');
                body = JSON.parse(body);
                body.message.should.eql('Pessoa não encontrada');
                body.should.not.include.keys(
                    'name', 'document', 'birthdate'
                );
                done();
            });
        });
    });
    