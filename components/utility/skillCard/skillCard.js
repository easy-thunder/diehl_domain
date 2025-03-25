import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DarkButton from "../button/darkButton";

export default function SkillCard(props) {
  const {
    title,
    supportingListFeatures = [],
    mainListFeatures = [],
    keyFeature,
    information,
    primaryLinks = [],
    primaryLinksLabel = "",
    secondaryLinks = [],
    secondaryLinksLabel = "",
    acquisitionDate,
    buttonText,
    buttonLink,
  } = props;

  const cardRef = useRef(null);
  const [needsExpansion, setNeedsExpansion] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      const needsScroll = card.scrollHeight > card.clientHeight + 2; 
      setNeedsExpansion(needsScroll);
    }
  }, []);

  return (
    <div
      className={`skill-card ${needsExpansion ? "needs-expansion" : ""}`}
      ref={cardRef}
    >
      <div className="skill-card__header">
        <h2 className="skill-card__header-name">{title}</h2>
        <div className="skill-card__header-meta">
          <span className="skill-card__header-meta-date">
            {acquisitionDate}
          </span>
          <span className="skill-card__header-meta-domain">
            {supportingListFeatures.map((item, index) => (
              <span key={`${title}-domain-${index}`}>
                {item}
                {index < supportingListFeatures.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
        </div>
      </div>

      <span className="skill-card__core">
        <strong>{keyFeature ? `${keyFeature} Skill |`:""} </strong>
        {mainListFeatures.map((tool, index) => (
          <span key={`${title}-tool-${index}`}>
            {tool}
            {index < mainListFeatures.length - 1 ? ", " : ""}
          </span>
        ))}
      </span>

      <p className="skill-card__info">{information}</p>

      {secondaryLinks.length > 0 && (
        <p className="skill-card__articles">
          <strong>{secondaryLinksLabel}</strong>{" "}
          {secondaryLinks.map((article, index) => (
            <Link key={`${title}-article-${index}`} href={`${article.href}`}>
              {article.text}
              {index < secondaryLinks.length - 1 ? " | " : ""}
            </Link>
          ))}
        </p>
      )}

      {primaryLinks.length > 0 && (
        <p className="skill-card__projects">
          <strong>{primaryLinksLabel}</strong>{" "}
          {primaryLinks.map((game, index) => (
            <Link key={`${title}-game-${index}`} href={`${game.href}`}>
              {game.text}
              {index < primaryLinks.length - 1 ? " | " : ""}
            </Link>
          ))}
        </p>
      )}
      <div className="skill-card__button-container">
      {buttonText&&<Link href={buttonLink}><DarkButton content={buttonText}/></Link>}
      </div>
    </div>
  );
}
