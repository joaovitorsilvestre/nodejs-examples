var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

var config = require('../config')
var db_session = mongoose.createConnection(config.database_session)

var SessionIdSchema = new mongoose.Schema({
    identifier: {
        type: String,
        require: true,
        unique: true
    },
    expires: {
        type: Date,
        require: true
    },
    user: {
        type:String,
        require: true
    }
})

//// MODEL COMPILED
var SessionId = db_session.model('SessionId', SessionIdSchema)

//// EXPORTS
exports.model = SessionId

exports.create = function(username, callback) {
    var randomId    = Math.random().toString(36).substr(2, 20);
    var expires     = new Date(Date.now() + (1000 * 60 * 60 * 24) );

    var newSession = new SessionId({
        identifier: randomId,
        expires: expires,
        user: username
    });

    newSession.save(function savingSessionInDb(err) {
        if (err) {
            throw new Error(err)
        }
    });

    return newSession.toObject()
}

exports.checkIdentifier = function(identifier, callback) {
    SessionId.findOne({ identifier: identifier },
        function searchSession(err, session) {
            if (err) {
                callback(err, null)
            }
            if (session) {
                var session = session.toObject();
                if (session.expires > Date.now()){
                    callback(null, session.user)
                } else {
                    callback(null, null)
                }
            } else {
                callback(null, null)
            }
    })
}
