import Link from "next/link";
export default function SkillCard({
  skillName,
  domain = [],
  tools = [],
  coreOrSupporting,
  information,
  gameProjects = [],
  articles = [],
  acquisitionDate
}) {

  return (
    <div key={skillName+domain+tools+coreOrSupporting} className={`skill-card`}>
      
      <div className="skill-card__header">
        <h2 className="skill-card__header-name">{skillName}</h2>
        <div className="skill-card__header-meta">
          <span className="skill-card__header-meta-date">{acquisitionDate}</span>
          <span className="skill-card__header-meta-domain">
            {domain.map((item, index) => (
              <span key={`${skillName}-domain-${index}`}>{item}{index < domain.length - 1? ", ": ''}</span>
            ))}
          </span>
        </div>
      </div>
      <span className="skill-card__core">
            <strong>{coreOrSupporting} Skill | </strong> {tools.map((tool, index) => (
              <span key={`${skillName}-tool-${index}`}>{tool}{index < tools.length - 1? ", ": ''}</span>
            ))}
        </span>

      <p className="skill-card__info">
        {information}
      </p>
          

          
          {articles.length > 0 && (
            <p className="skill-card__articles">
              <strong>Articles:</strong> {articles.map((article, index) => (
                <Link key={`${skillName}-article-${index}`} href={`skills/${article}`}>{article}{index < articles.length - 1 ? ", " : ""}</Link>
              ))}
            </p>
          )}
          
          {gameProjects.length > 0 && (
            <p className="skill-card__projects">
              <strong>Projects:</strong> {gameProjects.map((game, index) => (
                <Link key={`${skillName}-game-${index}`} href={`games/${game}`}>{game}{index < gameProjects.length - 1 ? ", " : ""}</Link>
              ))}
            </p>
          )}

      
 
    </div>
  );
}



