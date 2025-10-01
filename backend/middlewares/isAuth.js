import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try{
        // Check for token in cookies first, then in Authorization header
        let token = req.cookies.token;
        
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if(!token){
            return res.status(401).json({message: 'Unauthorized user, no token provided'})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decodedToken.userId;
        next();

    }
    catch(error){
        return res.status(401).json({message: `Unauthorized user: ${error.message}`})
    }
}
export default isAuth;