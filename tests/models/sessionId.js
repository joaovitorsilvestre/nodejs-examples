var mongoose = require('mongoose');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var SessionId = require('../../models/sessionId');



describe('SessionId', function() {
    before(function(done){
        _username = 'testing'
        mongoose.connect('mongodb://localhost:27017/test', done);
    })

    it('Creating new sessionId in db and test checkIdentifier', function(done) {
        var newSession = SessionId.create(_username);

        expect(newSession.identifier).to.exist;
        expect(newSession.expires).to.exist;
        expect(newSession.user).to.equal(_username);

        SessionId.checkIdentifier(newSession.identifier, function(err, user) {
            if (err) throw err;

            expect(user).to.equal(_username);
            done()
        })
    });



    after(function(done) {
        var dropIndexesAndDb = new Promise(function(resolve, reject) {
            mongoose.connection.db.dropDatabase(resolve);
        });

        dropIndexesAndDb.then(function() {
            mongoose.connection.close(done)
        });
    })
});
