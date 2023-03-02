const jwt = require("jsonwebtoken");
const ErrorHandling = require("../Utils/ErrorHandling");

exports.authenticateJWT =(...roles)=> (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                return res.status(403).json({message:`Unauthorized's Access`})
            }
            if(!roles.includes(user.user_type)){
                return res.status(403).json({message:`User with ${user.user_type} is not allowd to allocate this resource`})
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(403).json({message:"Unauthorized Token Access"})
    }
};

exports.isAuthorizeRole=(...roles)=>{
    return (res,req,next)=>{
        console.log(req.user)
        if(!roles.includes(req.user.user_type)){
            new ErrorHandling(`User with ${req.user.user_type} is not allowd to allocate this resource`,401)
        }
        next()
    }
}
