const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')

//change value below
const s3 = new S3Client({region: 'buckets region'});

 const upload = multer({
   storage: multerS3({
     s3: s3,
     acl: 'public-read',
     contentType: multerS3.AUTO_CONTENT_TYPE,
     //change value below
     bucket: 'bucket name',
     metadata: function (req, file, cb) {
     cb(null, {fieldName: file.fieldname});
   },
   ContentEncoding: 'base64',
   key: function (req, file, cb) {
     cb(null, `products/${file.originalname}`)
   }
   })
 })

const configureMulterMiddleware=upload.single('img');
 module.exports=configureMulterMiddleware;
