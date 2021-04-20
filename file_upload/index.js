const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const fileName = 'student.csv';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'testBucket.s3', // pass your bucket name
         Key: 'student.csv', // file will be saved as testBucket.s3/student.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};


const deleteFileFromS3 = () => {
    const params = {
      Bucket: 'testBucket.s3', // pass your bucket name
      Key: fileName, // file will be saved as testBucket.s3/student.csv
    };
    s3.deleteObject(params, function(err, data) {
      if (err) 
        console.log(err, err.stack);  // error
      else    
       console.log(chalk.green("File Successfully Deleted!"));
    });
  }; 
  

uploadFile();


