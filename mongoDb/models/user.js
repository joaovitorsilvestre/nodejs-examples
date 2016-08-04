var mongoose = require('mongoose');

// This line will use the db that is allready in use in the app.js.
var db = mongoose.connection;
//// If you want use another database to store this models
//// you can use the follow instead:
// var db = mongoose.createConnection('mongodb://localhost:27017/name_of_database')

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

// You can want to add some methods to your model
// here we create an method to return true or false if is the right password
UserSchema.methods.passwordMatch = function(passwordToCompare) {
    return this.password === passwordToCompare;
}

// If you want do some stuff before the save the model to database you can just:
UserSchema.pre('save', function(next) {
    // here you can use a hash to crypt the password for instance,
    // or other things that you need before save the model
    next();
});

// We need to compile this schema to can save at database
var User = db.model('User', UserSchema);

// Export the model compiled to we can use in others applications
exports.model = User;

// It's a good pratice to only make direct access from models to database
// You should never access access DB from controllers or others directly
// To manipulate data from controllers, we exports an function that do the hard work
exports.create = function(username, password, callback) {
    var NewUser = new User({
        username: username,
        password: password
    });

    // we save something to database using the follow method
    NewUser.save(function(err) {
        if (err) {
            return callback(err);
        } else {
            return callback();
        }
    });
};

// Also we can export another function that find an user based on username
// remember, only models shold have access to database
exports.findOneByUsername= function(username, callback) {
    User.findOne({username:username}, function findOneUser(err, user){
        // to handle connection erros
        if (err) return callback(err);

        if (user) {
            callback(null, user.toObject());
        } else {
            callback(null, null);
        };
    });
};
