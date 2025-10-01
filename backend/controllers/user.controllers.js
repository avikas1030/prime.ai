import User from "../models/user.model.js"
const getCurrentUser = async (req, res) => {
    try{
        let userId = req.userId;
        let user = await User.findById(userId).select('-password -__v -createdAt -updatedAt');
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        return res.status(200).json(user);
    }
    catch(error){
        return res.status(500).json({message: `getCurrentUser error : ${error.message} `})
    }
}
export default getCurrentUser