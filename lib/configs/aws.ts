import AWS from "aws-sdk";
import { join } from "path";

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export const uploadToS3 = async (file: File, path: string) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME || "",
        Key: join(path, `${Date.now()}-${file.name}`),
        Body: file.arrayBuffer,
        ContentType: file.type,
        ACL: "public-read",
    };

    const result = await s3.upload(params).promise();
    return result.Location; // URL of the uploaded file
};
