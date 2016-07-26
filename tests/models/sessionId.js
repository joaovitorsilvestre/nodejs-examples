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
        SessionId.create(_username, function(session) {
            expect(session.identifier).to.exist;
            expect(session.expires).to.exist;
            expect(session.user).to.equal(_username);

            SessionId.checkIdentifier(session.identifier, function(err, user) {
                expect(err).to.be.null;

                expect(user).to.equal(_username);
                done()
            })
        });
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
