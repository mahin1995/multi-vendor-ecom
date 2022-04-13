const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

const { APP_SECRET } = require('../config');

//Utility functions
module.exports.GenerateSalt = async() => {
        return await bcrypt.genSalt()    
},

module.exports.GeneratePassword = async (password, salt) => {
        return await bcrypt.hash(password, salt);
};


module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
        return await this.GeneratePassword(enteredPassword, salt) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
        // return await jwt.sign(payload, APP_SECRET, { 
        //         expiresIn: "1d",
        // } )
        console.log(Date.now())
        console.log(Math.floor(Date.now()) + (60 * 60 * 60 * 60 * 60))
return jwt.sign(payload, APP_SECRET,{
        expiresIn: Math.floor(Date.now()) + (60 * 60 * 60 * 60 * 60),
      });
}, 

module.exports.ValidateSignature  = async(req) => {

        const signature = req.get('Authorization');
        const token=signature.split(' ')[1]
        
        if(signature){
                try{
                        const payload = jwt.verify(token, APP_SECRET)
                        req.user = payload; 
                        console.log(payload)
                        return true;
                }
                catch(err){
                        console.log("error",err);
                        
                }

        }

        return false
};

module.exports.FormateData = (data) => {
        if(data){
            return { data }
        }else{
            throw new Error('Data Not found!')
        }
    }
