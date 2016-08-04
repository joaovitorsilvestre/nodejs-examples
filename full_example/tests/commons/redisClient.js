var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var redisClient = require('../../commons/redisClient');

describe('redisClient', function() {
    it('Testing the save of sessionId', function() {
        var identifier = 'random string';
        var username = 'test';

        redisClient.set(identifier, username);
    });

    it('Testing getting the value from redisDb', function() {
        redisClient.get('random string', function(err, value) {
            expect(err).to.be.null;
            expect(value).to.equal('test');
        });
    });

    after(function() {
        redisClient.DEL('random string');
        redisClient.quit();
    });
});
