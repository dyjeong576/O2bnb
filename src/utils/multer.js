const multer = require('multer');
const path = require('path');
const AWS = require("aws-sdk");
const multerS3 = require('multer-s3');
 
AWS.config.update({
   accessKeyId: process.env.S3_ACCESS_KEY_ID,
   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
   region: process.env.S3_REGION,
});
 
const upload = multer({
   storage: multerS3({
      s3: new AWS.S3(),
      bucket: process.env.S3_BUCKET_NAME,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(req, file, cb) {
         cb(null, `${Date.now()}_${path.basename(file.originalname)}`)
      },
   }),
   //* 용량 제한
   limits: { fileSize: 5 * 1024 * 1024 },
});
 
module.exports = { 
    upload 
}