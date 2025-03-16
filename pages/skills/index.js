import FullStretchCard from "@/components/utility/fullStretchCard/fullStretchCard";
import useS3Bucket from "@/hooks/api/useS3Bucket";
import { useState } from "react";
import SelectDropdown from "@/components/utility/selectDropdown/selectDropdown";

export default function Skills() {
  const apiEndpoint = "api/aws/get-presigned-url";
  const bucketName = "diehl-domain-data";
  const objectKey = "skillsData.json";
  const [activeSkills, setActiveSkills] = useState([]);



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
        <div className="filterForSkillsContainer">
          <div className="blurbOnSkillsOverview">
            <p>I love solving problems through programming. Entering the job market during a period of high saturation pushed me to explore a wide range of skills across multiple domains. Working at a startup further expanded my expertise, as I had to wear many hats and adapt to various challenges.</p>
            <p>Each skill listed here comes with details on why I acquired it, where and when I learned it, the projects I've applied it to, and any related articles I’ve written. I understand the breadth of skills may seem extensive, but they reflect my adaptability and continuous learning in an ever-evolving industry.</p>
          </div>
          <div className="filterSkills">
            <h2 className="filterHeader">Filters</h2>
            <SelectDropdown options={techAndSkills} selectLabel='Filter by Skill Name'/>

          </div>
        </div>
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





