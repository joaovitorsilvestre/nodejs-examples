module.exports = function(req, res, next) {
    res.render('home/index.ejs', {title: 'Home'});
};
