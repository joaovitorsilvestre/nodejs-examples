var mongoose = require('mongoose');
var chai = require('chai');
var expect = chai.expect;

var User = require('../../models/user');

// we can use describe to log some info in to console.
// But you should use this as separator of what modules are you
// testing in the moment
// The first argument is the message that you want

describe('User', function() {
    // we use before to execute some code that will run BEFORE
    // the rest of your tests
    before(function(done) {
        // before we start testing our model, we need start the connectio
        // with the database, when is done, the function done is called
        mongoose.connect('mongodb://localhost:27017/test', done);
    });

    // it is where you put your code that will be effectivy testing
    it('Testing creation of an user', function(done) {
        User.create('testUsername','testPassword', function(err, user) {
            expect(err).to.be.null;
            done()
        })
    });

    it('Testing the find one by username', function(done) {
        User.findOneByUsername('testUsername', function(err, user) {
            expect(err).to.be.null;
            expect(user).to.exist; // to be diferent that undefined or null
            done();
        })
    });

    // we use after to execute some code after all tests be finished
    // in this case, we will delete the database that we created
    after(function(done) {
        var dropColectionsAndDb = new Promise(function(resolve, reject) {
            mongoose.connection.db.dropDatabase(resolve);
        });

        dropColectionsAndDb.then(function() {
            mongoose.connection.close(done);
        });
    })
})
