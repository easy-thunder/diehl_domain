import FullStretchCard from "@/components/utility/button/fullStretchCard";
import skillsData from "@/data/skillsData";

export default function Skills() {
  return (
    <>
      {skillsData.map((skill, index) => (
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