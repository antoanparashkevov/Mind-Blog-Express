function isUser(){
   return (req,res,next) => {
       if(req.user) {
          next();  
       }else {
           return res.redirect('/auth/login');
       }
   } 
}

function isGuest() {
    return (req,res,next) => {
        if(!req.user) {
            return res.redirect('/')//TODO check the assignment for the correct redirect
        } else {
            next();
        }
    }
}

module.exports = {
    isUser,
    isGuest,
}