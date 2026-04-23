const User = require("../Models/user")

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs") }


module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.signup = async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
                
            }
            req.flash("success","welcome to Wanderlust");
            res.redirect("/listings");
        })
       
    } catch(e){
        req.flash("error",e.message)
        res.redirect("/listings")
}
    

    
}

module.exports.login = async (req,res,next)=>{
    req.session.save((err)=>{
        if(err)return next(err)
  
    req.flash("success","Welcome back to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl)
}
    )
}

module.exports.logout  = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }req.flash("success","logged you out!");
        res.redirect("/listings");
    });
}


