const S3 = require("aws-sdk/clients/s3");

module.exports = async ({
  data,
  filename,
  bucket,
  acl='private'
}) => {
  console.log("Uploading to S3");
  const params = {
    Bucket: bucket,
    Key: filename,
    Body: JSON.stringify(data),
    Metadata: {'Content-Type': 'application/json'},
    ACL: acl
  };
  const s3 = new S3();
  try {
    const s3data = await s3.putObject(params).promise();
    return s3data;
  } catch (error) {
    console.error("Error uploading S3");
    console.error(error);
  }
}
