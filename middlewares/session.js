const {verifySession} = require("../services/authService");

module.exports = () => (req,res,next)=> {
    const token = req.cookies.token;
    if(token) {
        try {
            const userData = verifySession(token)
            req.user = userData;
            console.log('Verified User Data >>> ', req.user)
        } catch (err) {
            //in case the cookie is invalid
            res.clearCookie('token');
           return res.redirect('/auth/login')//if we don't return, it will call next() and it will continue so that way we will have an error in the console
        }
    }
    next();
}