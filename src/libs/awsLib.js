import AWS from "aws-sdk";
import config from "../config";

export async function s3Upload(attachment) {

    const file = attachment.file;
  
    if (file) {
      const s3 = new AWS.S3({
        accessKeyId: config.keys.ACCESS,
        secretAccessKey: config.keys.SECRET,
        region: config.storage.REGION
      });
  
      s3.upload({
        Bucket: config.storage.BUCKET,
        Key: 'images/'+ Date.now() + "- " + encodeURIComponent(file.name),
        ContentType: file.type,
        Body: file,
        ACL: 'public-read'
      }, function(err, data) {
        if (err) {
          return alert('There was an error uploading your image: ', err.message);
        }
        attachment.setAttributes({
          url: data.Location,
          href: data.Location
        });
  
      });
    }
  
  }