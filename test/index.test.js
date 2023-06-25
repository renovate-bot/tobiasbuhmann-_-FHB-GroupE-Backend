/*
const request = require("request");
const expect = require("chai").expect;
const app_api = require('../src/index');

describe('Test 1', () => {
    let url = "http://localhost:3001/"

    describe('GET /', () => {
        it('Returns expected content', () => {
            request(url, function (err, response) {
                expect(response.body).to.contain("Hello World!");
                done();
            });
        });
    });
    
    describe('GET /', () => {
        it('Returns 200 OK', () => {
            request(url, function (err, response) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('POST /api/notes', () => {
        it('Returns error when creating an empty note', () => {
            request(url, function (err, response) {
                expect(response.statusCode).to.equal(400);

                done();
            });
            return request(app_api)
                .post('/api/notes')
                .expect('{"error":"content missing"}')
                .expect(400);
        });
    })
});
*/

const assert = require('assert');
const request = require('supertest');
const app = require('../src/index');

describe('GET /', function() {
  it('should return "Hello World!"', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        assert.strictEqual(res.text, '<h1>Hello World!</h1>');
        done();
      });
  });
});

describe('POST /api/notes', function() {
  it('should create a new note', function(done) {
    const note = {
      content: 'This is a test note',
      important: true,
    };

    request(app)
      .post('/api/notes')
      .send(note)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        assert.strictEqual(res.body.content, note.content);
        assert.strictEqual(res.body.important, note.important);
        assert.strictEqual(typeof res.body.id, 'number');
        done();
      });
  });
});

describe('GET /api/notes', function() {
  it('should return the list of notes', function(done) {
    request(app)
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        assert.strictEqual(Array.isArray(res.body), true);
        done();
      });
  });
});