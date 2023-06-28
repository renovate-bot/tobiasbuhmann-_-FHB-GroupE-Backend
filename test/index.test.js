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