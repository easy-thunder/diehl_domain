import FullStretchCard from "@/components/utility/button/fullStretchCard";
import useS3Bucket from "@/hooks/api/useS3Bucket";

export default function Skills() {
  const apiEndpoint = "api/aws/get-presigned-url";
  const bucketName = "diehl-domain-data";
  const objectKey = "skillsData.json";

  const { data: skillsData, loading, error } = useS3Bucket(apiEndpoint, bucketName, objectKey);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {skillsData && skillsData.skillsData.map((skill, index) => (
        <FullStretchCard
          key={index}
          title={skill.title}
          blurb={skill.blurb}
          tags={skill.tags.join(', ')}
          link={skill.link}
          linkText={skill.linkText}
        />
      ))}
    </>
  );
}


