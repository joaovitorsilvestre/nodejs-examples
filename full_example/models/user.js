var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
});

UserSchema.methods.passwordMatch = function(password){
    var match = bcrypt.compareSync(password, this.password);
    return match;
};

UserSchema.pre('save', function(next) {
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    next();
});

/// Compiled
var User = db.model('User', UserSchema);

/// EXPORTS
exports.model = User;


exports.create = function(username, password, callback) {
    var newUser = new User({
        username: username,
        password: password
    });

    newUser.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        };
    });
};

exports.authenticate = function(username, password, callback){
    User.findOne({ username: username }, function(err, user){
        if (err) return callback(err);

        if (user) {
            if ( user.passwordMatch(password) ) {
                callback(null, user.toObject());
            } else {
                callback(null, null);
            }
        } else {
            return callback(null, null);
        };
    });
};

exports.findOneByUsername = function(username, callback) {
    User.findOne({username:username}, function findOneUser(err, user){
        if (err) return callback(err);

        if (user) {
            callback(null, user.toObject());
        } else {
            callback(null, null);
        };
    });
};
