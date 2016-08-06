var chai = require('chai');
var expect = chai.expect;

var redisClient = require('../../commons/redisClient');

describe('Redis Client', function() {
    before(function(){
        client = new redisClient(6379, '127.0.0.1');
    });

    it('Testing setting value to a key', function(done) {
        client.set('keyExample', 'valueExample', done);
    });

    it('Testing getting the value of an key', function(done) {
        client.get('keyExample', function(err, value) {
            expect(err).to.be.null;
            expect(value).to.equal('valueExample');
            done();
        });
    });

    it('Testing deletion of the key', function(done) {
        client.DEL('keyExample', done);
    });

    after('Close the connection', function(done) {
        client.quit(done);
    });
})
