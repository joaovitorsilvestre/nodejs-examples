var mongoose = require('mongoose');

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
