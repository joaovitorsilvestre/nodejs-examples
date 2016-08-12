module.exports = function(req, res, next) {
    res.render('chat/index.ejs', {title: 'HomePage'});
};
