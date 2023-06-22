const request = require("request");

describe('App Api Tests', () => {
    let url = "http://localhost:3001/"

    describe('GET /', () => {
        it('Should return a successful Hello World! HTTP GET', (done) => {
            request(url, function (err, response) {
                expect(response.body).to.contain("Hello World!");
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});