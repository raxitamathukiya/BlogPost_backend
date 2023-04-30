const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token){
        try {
            let decoded= jwt.verify(token, 'raxita')
            if(decoded){
                req.body.user=decoded.user
                req.body.user_id=decoded.user_id
                next()
            }else{
                res.send("......Please Login......")
            }
        } catch (error) {
            console.log(error)
        }
    }
    else{
        res.send("......Please Login......")
    }
}

module.exports={
    auth
}