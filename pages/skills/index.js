import FullStretchCard from "@/components/utility/button/fullStretchCard";
import useS3Bucket from "@/hooks/api/useS3Bucket";
import { useState, useEffect } from "react";

export default function Skills() {
  const apiEndpoint = "api/aws/get-presigned-url";
  const bucketName = "diehl-domain-data";
  const objectKey = "skillsData.json";
  // const [skillsData, setSkillsData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [activeSkills, setActiveSkills] = useState([]);

  // useEffect(() => {
  //   const fetchSkillsData = async () => {
  //     try {
  //       const response = await fetch('/data/skills.json');
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch skills data");
  //       }
  //       const data = await response.json();
  //       setSkillsData(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSkillsData();
  // }, []);

  const { data: skillsData, loading, error } = useS3Bucket(apiEndpoint, bucketName, objectKey);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const techAndSkills = [
    "Vanilla Javascript", "Module Javascript", "CSS", "SCSS", "HTML", 
    "CSS.module", "Bcrypt", "Server Side Rendering", "Design", 
    "Dynamic Rendering", "Axios", "Fetch requests", "Data Structures", 
    "Meta Tags", "Next.js", "local storage", "uuid", "fetch request", 
    "validation", "NextAPI", "Express", "Lambda", "API Gateway", "S3", 
    "Amazon RDS", "SQL", "Restful conventions", "Query Params", "SWR", 
    "Socket.io", "PeerJS", "TCP", "WebRTC", "HTTP", "SVG", 
    "Chrome Extensions", "Plasmo", "Web scraping"
  ];



  const toggleSkill = (skill) => {
    setActiveSkills(prevActiveSkills =>
      prevActiveSkills.includes(skill)
        ? prevActiveSkills.filter(s => s !== skill)
        : [...prevActiveSkills, skill]
    );
  };

  const filteredSkillsData = activeSkills.length
    ? skillsData.skillsData.filter(skill =>
        skill.tags.some(tag => activeSkills.includes(tag))
      )
    : skillsData.skillsData;
  



    return (
      <>
        <h2 className="pageTitle">Skills and tech used</h2>
        <h2 className="pageSubTitle">Click to filter skills</h2>
        <div className="techBucket">
          <div className="centerContentHorizontally">
          {techAndSkills.map(skill => (
            <label key={skill} className={`techBucket__tag ${activeSkills.includes(skill) ? 'active' : ''}`}>
              <input
                type="checkbox"
                checked={activeSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              <span>{skill}</span>
            </label>
          ))}
          </div>
        </div>
        <div>
          {filteredSkillsData.map((skill, index) => (
            <FullStretchCard
              key={index}
              title={skill.title}
              blurb={skill.blurb}
              tags={skill.tags.join(', ')}
              link={skill.link}
              linkText={skill.linkText}
            />
          ))}
        </div>
      </>
    );
}





