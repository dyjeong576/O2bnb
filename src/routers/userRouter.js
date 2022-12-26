const router = require('express').Router();
const { upload } = require('../utils/multer');

const { userController }  = require('../controllers');

router.get('/kakao-signin', userController.signIn);
router.get('/profileImage', userController.imageUpload);
router.post('/upload', upload.single("img"), userController.imageUpload);

module.exports = router;







