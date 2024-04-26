
const jwt=require('jsonwebtoken');

const generateJwtToken=(userId)=>{
    const jwt_secret_key=process.env.JWT_SECRET_KEY;
    const token=jwt.sign({userId},jwt_secret_key,{expiresIn:"30d"});
    return token;
}
const verifyJwtToken=(token)=>{
    const jwt_secret_key=process.env.JWT_SECRET_KEY;
    const payload=jwt.verify(token,jwt_secret_key);
    return payload;
}
module.exports = {generateJwtToken,verifyJwtToken};