module.exports = () => (req,res,next) => {
    if(req.user) {
        res.locals.hasUser = true;
        res.locals.username = req.user.username;
    }
    next();
}