

//aws/get-presigned-url.js
import { S3 } from 'aws-sdk';
require('dotenv').config();

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
});

export default function handler(req, res) {
    if (req.method === 'GET') {


        const bucketName = 'diehl-domain-data';
        const objectKey = 'skillsData.json';
        const params = {
            Bucket: bucketName,
            Key: objectKey,
            Expires: 60 // 1 minute
        };

        // Generate the presigned URL
        const presignedUrl = s3.getSignedUrl('getObject', params);
        console.log('Presigned URL:', presignedUrl);

        // Send the presigned URL back in the response
        res.status(200).json({ presignedUrl });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
