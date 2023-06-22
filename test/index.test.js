const request = require("request");
const expect = require("chai").expect;

describe('Test 1', () => {
    let url = "http://localhost:3001/"

    describe('GET /', () => {
        it('Returns content and 200 OK', (done) => {
            request(url, function (err, response) {
                expect(response.body).to.contain("Hello World!");
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});