module.exports = function(req, res, next) {
    res.render('index/index', { title: 'Index' , user: req.user});
};
