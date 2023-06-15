var jwt = require('jsonwebtoken');


const Auth = (req,res,next)=>{
    let token=req.headers.authorization;

    if(token)
    {
        var decoded = jwt.verify(token, 'masai');
        if(decoded)
        {
            req.body.userid=decoded.userid;
            next();
        }
    }
}

module.exports={Auth};