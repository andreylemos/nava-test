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
            // there should be a 200 status code
            res.statusCode.should.eql(200);
            // the response should be JSON
            res.headers['content-type'].should.contain('application/json');
            // parse response body
            body = JSON.parse(body);
            // the first object should have the right value for name
            body[1].name.should.eql('Ricardo Calegaro');
            // the object should have the right keys
            body[1].should.include.keys(
                '_id', 'name', 'document', 'birthdate'
            );
            // the JSON response body should have a key-value pair of {"data": [2 person objects]}
            body.length.should.eql(2);
            done();
        });
    });
    it('should return not found', (done) => {
        this.get.yields(null, responseObject.notFound, JSON.stringify(notFound.notFoundList));
        request.get(`http://localhost:3000/persons/`, (err, res, body) => {
            // there should be a 404 status code
            res.statusCode.should.eql(404);
            // the response should be JSON
            res.headers['content-type'].should.contain('application/json');
            // parse response body
            body = JSON.parse(body);
            // the object should have the right value for name
            body.message.should.eql('Pessoas não encontradas');
            // the object should have the right keys
            body.should.not.include.keys(
                '_id', 'name', 'document', 'birthdate'
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
            request.get(`http://localhost:3000/persons/`, (err, res, body) => {
                // there should be a 200 status code
                res.statusCode.should.eql(200);
                // the response should be JSON
                res.headers['content-type'].should.contain('application/json');
                // parse response body
                body = JSON.parse(body);
                // the object should have the right value for name
                body.name.should.eql('Andrey Lemos');
                // the object should have the right keys
                body.should.include.keys(
                    '_id', 'name', 'document', 'birthdate'
                );
                done();
            });
        });
        it('should return not found', (done) => {
            this.get.yields(null, responseObject.notFound, JSON.stringify(notFound.notFoundOne));
            request.get(`http://localhost:3000/persons/`, (err, res, body) => {
                // there should be a 404 status code
                res.statusCode.should.eql(404);
                // the response should be JSON
                res.headers['content-type'].should.contain('application/json');
                // parse response body
                body = JSON.parse(body);
                // the object should have the right value for name
                body.message.should.eql('Pessoa não encontrada');
                // the object should have the right keys
                body.should.not.include.keys(
                    '_id', 'name', 'document', 'birthdate'
                );
                done();
            });
        });
    });
    