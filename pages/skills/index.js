import { useEffect, useState } from "react";
import SelectDropdown from "@/components/utility/selectDropdown/checkboxDropdown";
import SkillCard from "@/components/utility/skillCard/skillCard";
import { skillsToDisplayFunction } from "../../lib/internalData/skillsToDisplay";
export default function Skills() {
  const [selectedFilters, setSelectedFilters] = useState([])
  const [filterArray, setFilterArray] = useState([]);
  const skillsToDisplay=skillsToDisplayFunction();

  const sortedSkillsOriginal = [...skillsToDisplay].sort((a, b) =>
    a.skillName.localeCompare(b.skillName)
  );

  const sortedSkillNames = [...new Set(
    skillsToDisplay.flatMap(skill => skill.skillName).sort((a, b) => a.localeCompare(b))
  )];

  const sortedDomainNames = [...new Set(
    skillsToDisplay.flatMap(skill => skill.domain).sort((a, b) => a.localeCompare(b))
  )];

  const sortedToolNames = [...new Set(
    skillsToDisplay.flatMap(skill => skill.tools).sort((a, b) => a.localeCompare(b))
  )];

  const sortedCoreOrSupporting = [...new Set(
    skillsToDisplay.flatMap(skill => skill.coreOrSupporting).sort((a, b) => a.localeCompare(b))
  )];

  const monthMap = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
  };
  const sortedDates = [...new Set(
    skillsToDisplay
      .map(skill => skill.acquisitionDate) // Extract just the date strings
      .sort((a, b) => {
        const [monthA, yearA] = a.split(" ");
        const [monthB, yearB] = b.split(" ");

        const dateA = new Date(`${yearA}-${monthMap[monthA]}`);
        const dateB = new Date(`${yearB}-${monthMap[monthB]}`);

        return dateB - dateA; // Newest to Oldest
      })
  )];

  const allFilterText = [
    { array: sortedSkillNames, title: 'Filter by Skill Name', key: 'skillName' },
    { array: sortedDomainNames, title: 'Filter by Domain Name', key: 'domain' },
    { array: sortedToolNames, title: 'Filter by Tool Name', key: 'tools' },
    { array: sortedCoreOrSupporting, title: 'Filter by Core or Supporting Skill', key: 'coreOrSupporting' },
    { array: sortedDates, title: 'Filter by Date', key: 'acquisitionDate' },
  ]

  const runFilterArray = (skillsArray, index) => {
    if (!filterArray[index]) {
      setSelectedFilters([...sortedSkillsOriginal]);
      return;
    }
    const { filterTitle, selectedOptions } = filterArray[index];

    const newFilteredSkills = skillsArray.filter(skill => {
      const skillValue = skill[filterTitle];
      return Array.isArray(skillValue)
        ? selectedOptions.some(opt => skillValue.includes(opt))
        : selectedOptions.includes(skillValue);
    });

    setSelectedFilters(newFilteredSkills);

    if (index < filterArray.length - 1) {
      runFilterArray(newFilteredSkills, index + 1);
    }
  };

  useEffect(() => {
    if (filterArray.length > 0) {
      runFilterArray([...sortedSkillsOriginal], 0);
    } else {
      setSelectedFilters([...sortedSkillsOriginal]); // Reset filters when empty
    }
  }, [filterArray]);

  const handleFilterSubmit = (filterTitle, selectedOptions) => {
    setFilterArray(prevFilters => {
      const existingFilterIndex = prevFilters.findIndex(filter => filter.filterTitle === filterTitle);

      if (existingFilterIndex !== -1) {
        if (selectedOptions.length === 0) {
          const updatedFilters = prevFilters.filter((_, index) => index !== existingFilterIndex);
          return updatedFilters;
        }
        const updatedFilters = [...prevFilters];
        updatedFilters[existingFilterIndex] = { filterTitle, selectedOptions };
        return updatedFilters;
      }

      return selectedOptions.length > 0 ? [...prevFilters, { filterTitle, selectedOptions }] : prevFilters;
    });
  };

  return (
    <>
      <h2 className="pageTitle">Skills and tech used</h2>
      <div className="filterForSkillsContainer">
        <div className="blurbOnSkillsOverview">
          <p>I love solving problems through programming. Entering the job market during a period of high saturation pushed me to explore a wide range of skills across multiple domains. Working at a startup further broadened my expertise, as I had to wear many hats and adapt to various challenges.</p>
          <p>As a result I have more skills than what I can fit on a Resumé. This is why I wanted to host all of my skills on my website. Since I am applying to several different jobs I have included filters to group skills by the domains I have worked in.</p>
        </div>
        <div className="filterSkills">
          <h2 className="filterHeader">Filters</h2>
          <div className="filterSkillsOptions">
            {allFilterText.map((filterTextArray, index) =>
              <SelectDropdown
                key={`filter-${index}`}
                options={filterTextArray.array}
                selectLabel={filterTextArray.title}
                onSubmit={(selectedOptions) => handleFilterSubmit(filterTextArray.key, selectedOptions)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="techBucket">
        {selectedFilters && selectedFilters.map((skillObject, index) =>
          <SkillCard
            key={`card-${index}`}
            title={skillObject.skillName}
            supportingListFeatures={skillObject.domain}
            mainListFeatures={skillObject.tools}
            keyFeature={skillObject.coreOrSupporting}
            information={skillObject.information}
            primaryLinks={skillObject.gameProjects}
            primaryLinksLabel={skillObject.gameProjectLabel}
            secondaryLinks={skillObject.articles}
            secondaryLinksLabel={skillObject.articleLabel}
            acquisitionDate={skillObject.acquisitionDate}
          />)}
      </div>


    </>
  );
}




