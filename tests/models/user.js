var mongoose = require('mongoose');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var User = require('../../models/user');

describe('User', function() {
    before(function(done){
        _username = 'test';
        _password = 'testing';
        mongoose.connect('mongodb://localhost:27017/test', done);
    })

    it('Testing the creation of a new user', function(done) {
        assert.doesNotThrow(function() {
            User.create(_username, _password, function(err) {
                if (err) throw err;

                done()
            })
        })
    });

    it('Testing the findOneByUsername', function(done){
        assert.doesNotThrow(function() {
            User.findOneByUsername( _username, function(err, user) {
                if (err) throw err;

                expect(user).to.not.be.null;
            });

            User.findOneByUsername( 'usernameDoesntExist', function(err, user) {
                if (err) throw err;

                expect(user).to.be.null;

                done()
            } )
        })
    });

    it('Testing authentication', function(done) {
        assert.doesNotThrow(function() {
            User.authenticate(_username, _password, function(err, user) {
                if (err) throw err;

                expect(user).to.not.be.null;
                expect(user.username).to.equal( _username );
                // there's a hash that crypt the password, so
                // this verify if it is diferent of the original;
                expect(user.password).to.not.equal( _password );

                done()
            })
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
