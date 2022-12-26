const  { userService }  = require('../services');
const { catchAsync } = require('../utils/error');


const signIn = catchAsync(async (req, res) => {
    const authCode = req.query.code;
    
    if(!authCode){
        const error =  new Error("AUTHCODE_DOESN'T_EXIST");
        error.statusCode = 400;
        throw error;
    }

    const accessToken = await userService.signIn(authCode);

     return res.status(201).json({ accessToken });

})

const imageUpload = catchAsync(async(req, res) => {

    const imageInfo = req.file;

    if(imageInfo == undefined) res.status(400).json({message : 'IMAGE_DOESNT_EXISTED'});
    
    await userService.imageUpload(imageInfo);
  
    res.status(200).json({ message : 'SUCCESS_EDIT_PROFILEIMAGE' });

  })

module.exports = {
    signIn,
    imageUpload
}