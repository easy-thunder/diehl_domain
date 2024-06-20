import { useEffect, useState } from "react";

const useS3Bucket = (apiEndpoint, bucketName, objectKey) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the presigned URL from your API
        const presignedUrlResponse = await fetch(apiEndpoint);
        if (!presignedUrlResponse.ok) {
          throw new Error("Failed to fetch presigned URL");
        }
        const presignedUrlData = await presignedUrlResponse.json();
        const presignedUrl = presignedUrlData.presignedUrl;

        // Fetch the JSON data from S3 using the presigned URL
        const response = await fetch(presignedUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data from S3");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, bucketName, objectKey]);

  return { data, loading, error };
};

export default useS3Bucket;