const app = require('../src/app')

describe('App', ()=> {
    it("GET/ responds with 200 'Hello World'", ()=> {
        return supertest(app)
        .get('/')
        .then(res => {
            expect(res.body).to.equal('Hello World!')
        });
    });
});
