module.exports = async (req,res,next) => {
    
   const isAuth = req.session.isAuthenticated;
   

   if(isAuth){
       return next();
   }
   return res.redirect('/login')
}