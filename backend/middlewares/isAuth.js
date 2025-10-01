import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: 'unotherized user, no token' })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedToken);
        req.userId = decodedToken.userId;
        next();

    }
    catch(error){
        return res.status(401).json({message: `unotherized user : ${error.message} `})
    }
}
export default isAuth;