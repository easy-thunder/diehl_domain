import FullStretchCard from "@/components/utility/fullStretchCard/fullStretchCard";
import useS3Bucket from "@/hooks/api/useS3Bucket";
import { useState } from "react";
import SelectDropdown from "@/components/utility/selectDropdown/selectDropdown";

export default function Skills() {
  const apiEndpoint = "api/aws/get-presigned-url";
  const bucketName = "diehl-domain-data";
  const objectKey = "skillsData.json";
  //const [activeSkills, setActiveSkills] = useState([]);

  const monthMap = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
  };

  const { data: skillsData, loading, error } = useS3Bucket(apiEndpoint, bucketName, objectKey);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const skillsToDisplay=[
    {
      skillName:"Vanilla Javascript",
      domain:['Client Side','Server Side'],
      coreOrSupporting:"Core",
      information: "I started learning Vanilla Javascript with Udemy before I started my classes at FlatIron where I stretched this skill. After graduation I mainly use Vanilla Javascript in Chrome extensions with Rollup to easily webscrape data with query-Selectors.",
      gameProjects:[],
      articles:["chromeExtension"],
      tools:['JavaScript'],
      acquisitionDate:'June 2022'
    },
    {
      skillName:"BEM standards",
      domain:['Client Side'],
      coreOrSupporting:"Core",
      information: "I first learned CSS at Flat Iron School. After graduation my gameProjects would have one large CSS file that wasn't easy to navigate. So I wanted to find a way to modularize styling. I really enjoy the ability to nest classes within eachother and apply BEM principals to my SCSS now.",
      gameProjects:[],
      articles:[],
      tools:['CSS','SCSS','HTML'],
      acquisitionDate:'February 2023'

    },
    {
      skillName:"HTML",
      domain:['Client Side'],
      coreOrSupporting:"Core", 
      information:"I learned HTML in FlatIron. I now primarily use HTML in JSX. After graduation I expanded my knowledge of useful HTML tags.",
      gameProjects:[],
      articles:[],//TODO JAKE add article for HTML tags for Meta Tags
      tools:['HTML'],
      acquisitionDate:'November 2022'
    },
    {
      skillName:"Encryption",
      domain:['Server Side'],
      coreOrSupporting:"Core", 
      information:"To securely store passwords, I use the bcrypt library to salt and hash them, ensuring strong encryption and protection against brute-force attacks. Salting adds randomness, making each hash unique even for identical passwords.",
      gameProjects:[],
      articles:[],//TODO add article on using bCrypt for encryption
      tools:['bcrypt'],
      acquisitionDate:'January 2023'
    },
    {
      skillName:"Server Side Rendering",
      domain:['Server Side'],
      coreOrSupporting:"Core",
      information:"Using getServerSideProps built into Next.js I speed up load times by fetching data before rendering pages.",
      gameProjects:[],//Todo add Github that uses serverSide Rendering
      articles:[],
      tools:['Next.js'],
      acquisitionDate:'April 2023'

    },
    {
      skillName:"Web Design ",
      domain:['Client Side'],
      coreOrSupporting:"Supporting",
      information:"I wouldn't say I have an experts eye for design. But I do use Figma to create components and color pallets to visualize before developing.",
      gameProjects:[],
      articles:[],
      tools:['Figma'],
      acquisitionDate:'May 2023'

    },
    {
      skillName:"Dynamic Rendering",
      domain:['Client Side'],
      coreOrSupporting:"Core",
      information:"Dynamic Rendering allows applications to generate UI components based on data, enabling flexibility and scalability. In React and Next.js, this involves mapping over structured data (e.g., from a database or API) and dynamically rendering components.In Next.js, dynamic routes ([id].js) combined with the useRouter hook enable content to be fetched and displayed based on URL parameters, making it easy to build data-driven pages such as blogs, profiles, and product listings.",
      gameProjects:[],
      articles:['dynamicJSX'],
      tools:['JavaScript','PostgreSQL','JSON','TypeScript'],
      acquisitionDate:'January 2023'
    },
    {
      skillName:"Fetching JSON Data",
      domain:['Client Side','Server Side'],
      coreOrSupporting:"Core",
      information:"Fetched JSON data, use fetch('url', { method, headers, body }), setting the method (GET, POST, etc.), headers (Content-Type: application/json), and converting the body with JSON.stringify(). The response is then parsed using .json() to convert it back into a usable JavaScript object.",
      gameProjects:[],
      articles:[],
      tools:['JavaScript','TypeScript'],
      acquisitionDate:'December 2022'

    },
    {
      skillName:"Browser Storage Management",
      domain:['Client Side'],
      coreOrSupporting:"Core",
      information:"I first used this skill with chrome local storage to save user information. I found that this was also very useful for saving small details for user preferences as well.",
      gameProjects:[],
      articles:[],
      tools:['Chrome Storage','JavaScript','TypeScript'],
      acquisitionDate:'May 2023'
    },
    {
      skillName:"Data Identification and Key Management",
      domain:['Client Side','Server Side'],
      coreOrSupporting:"Core",
      information:"I securely managed API keys using .env files and generate unique identifiers with UUIDs to ensure reliable data identification and integrity across client and server applications.",
      gameProjects:[],
      articles:[],//TODO add article for key management and identification.
      tools:['dotenv','uuid','docker'],
      acquisitionDate:'January 2023'

    },
    {
      skillName:"API Routing",
      domain:["Server Side"],
      coreOrSupporting:"Core",
      information:"I have utilized many different tools for API routing. I have used Express router for routing to my controllers; Next.js Built in file routing where you just build your controller and the routes are based off file structure. I have used Sinatra separate from Ruby on Rails, and I have used Ruby on Rails.",
      gameProjects:[],
      articles:['restful-express'],
      tools:['Express','JavaScript','TypeScript','NextJS','Ruby','Sinatra','Ruby on Rails'],
      acquisitionDate:'January 2023'
    },
    {
      skillName:"CRUD Operations with Controllers & PostgreSQL",
      domain:['Server Side'],
      coreOrSupporting:"Core",
      information:"I have designed RESTful APIs that handle client requests via controllers, using POST, GET, UPDATE, and DELETE methods to interact with PostgreSQL. I have implemented this using raw PSQL queries, Sequelize ORM, and Sinatra to manage structured data efficiently.",
      gameProjects:[],
      articles:['restful-express'],
      tools:['PSQL','Express','Sinatra','Ruby on Rails','PostgreSQL'],
      acquisitionDate:'February 2023'
    },
    {
      skillName:"Serverless Backend Development with AWS",
      domain:['Server Side'],
      coreOrSupporting:"Supporting",
      information:"I designed a serverless API using API Gateway to route client requests to AWS Lambda controllers, enabling seamless data updates in an Aurora RDS PostgreSQL database.",
      gameProjects:[],
      articles:[],
      tools:['API Gateway','Lambda','Amazon RDS'],
      acquisitionDate:'July 2023'

    },
    {
      skillName:"DOM Manipulation with JavaScript",
      domain:['Client Side'],
      coreOrSupporting:"Core",
      information:"I used document.querySelector and other DOM methods to dynamically select, modify, and interact with elements on a webpage, enabling real-time UI updates and user interactions.",
      gameProjects:[],
      articles:['chrome-extension-web-scrape'],
      tools:['JavaScript','TypeScript'],
      acquisitionDate:'December 2023'

    },
    {
      skillName:"Real-Time Data Synchronization",
      domain:['Client Side','Server Side'],
      coreOrSupporting:"Core",
      information:"I leveraged SWR’s automatic revalidation and real-time data fetching to synchronize client states across users, enabling interactive multiplayer games like Connect 4 and Pentago, as well as instant messaging systems. I have also utilized WebRTC with socket.io to build a real time video platform.",
      gameProjects:['ConnectFour','pentago'],
      articles:['zoom-application'],
      tools:['Next.js','useSWR'],
      acquisitionDate:'July 2024'


    },
    {
      skillName:"Cleaning and mapping CSV's",
      domain:['Server Side'],
      coreOrSupporting:"Core",
      information:"CSV Data Processing & Transformation in TypeScriptI use fs.readFileSync to read CSV files in TypeScript, then clean, map, and transform the data into structured formats, ensuring type safety and seamless integration into applications. I have also used Pandas with Jupyter Notebooks, Matplotlib, and Seaborn to clean and transform CSV's into charts and graphs.",
      gameProjects:[],
      articles:[],
      tools:['fs','TypeScript','JavaScript','Python','Pandas','Matplotlib','Seaborn'],
      acquisitionDate:'December 2024'

    },
    {
      skillName:"Test Driven Development",
      domain:['Client Side','Server Side'],
      coreOrSupporting:"Core",
      information:"Used Jest testing I think about what functionality I want to achieve and how to avoid any potential edge cases.",
      gameProjects:[],
      articles:[],//TODO write article about Jest testing
      tools:['Jest'],
      acquisitionDate:'July 2024'

    },
    {
      skillName:"Automated Data Pipelines with Dagster & PostgreSQL",
      domain:['Data Engineering'],
      coreOrSupporting:"Core",
      information:"I designed and automate Dagster jobs to transform JSON data into structured PostgreSQL tables, ensuring efficient data processing and integration.",
      gameProjects:[],
      articles:[],
      tools:['Dagster','Python','Snowflake'],
      acquisitionDate:'February 2025'

    },
    {
      skillName:"Data Cleaning & Transformation with DBT",
      domain:['Data Engineering'],
      coreOrSupporting:"Core",
      information:"I use DBT to clean and transform raw data imported via Dagster, optimizing it for production-ready analytics in Snowflake.",
      gameProjects:[],
      articles:[],
      tools:['DBT','yaml','PostgreSQL','jinja','Snowflake'],
      acquisitionDate:'January 2025'

    },
    {
      skillName:"Testing with Custom DBT Macros",
      domain:['Data Engineering'],
      coreOrSupporting:"Core",
      information:"Built Macro that took in variables passed by yaml that returned list of outlier data points for Novata.",
      gameProjects:[],
      articles:[],
      tools:['DBT','yaml','PostgreSQL','jinja'],
      acquisitionDate:'February 2025'

    }, 
    {
      skillName:"Dashboard building with Sisense",
      domain:['Analytics'],
      coreOrSupporting:"Supporting",
      information:"Have built dashboards with Sisense and modified the admin files to change the look and feel of Sisense widgets.",
      gameProjects:[],
      articles:[],
      tools:['Sisense'],
      acquisitionDate:'July 2024'

    },
    {
      skillName:"Debugging",
      domain:['Client Side','Server Side'],
      coreOrSupporting:"Core",
      information:"When I know where the problem exists I typically use console.log or a print. When I don't know where in the function a failure has happened I use a debugger.",
      gameProjects:[],
      articles:[],
      tools:['JavaScript','Python','Ruby','AWS'],
      acquisitionDate:'November 2022'

    },
    {
      skillName:"Data Modeling",
      domain:['Data Engineering'],
      coreOrSupporting:"Core",
      information:"I have created different data models with DBT, Sequelize, Ruby on Rails, and Sisense.",
      gameProjects:[],
      articles:[],
      tools:['Sisense','DBT','Sequelize','Ruby on Rails'],
      acquisitionDate:'March 2023'

    },
    {
      skillName:"State & Lifecycle Management in React",
      domain:['Client Side'],
      coreOrSupporting:"Core",
      information:"I use useState to manage component state and useEffect to handle side effects, ensuring efficient updates and reactivity in React applications.",
      gameProjects:[],
      articles:[],
      tools:['React'],
      acquisitionDate:'January 2023'

    },
    {
      skillName:"Version control with GitHub",
      domain:['Client Side','Server Side','Data Engineering'],
      coreOrSupporting:"Supporting",
      information:"I efficiently manage version control using Git and GitHub, leveraging branching (git checkout), merging (git merge), and repository management (git clone, git push). I follow best practices for staging (git add), committing (git commit), and tracking changes (git status), ensuring smooth collaboration and code integrity.",
      gameProjects:[],
      articles:[],
      tools:['React'],
      acquisitionDate:'October 2022'

    },
    {
      skillName:"Modular Programming",
      domain:['Client Side','Server Side','Data Engineering'],
      coreOrSupporting:"Supporting",
      information:"I write DRY (Don't Repeat Yourself) code by modularizing functionality into reusable components and structures. In React, I create dynamic, reusable components to streamline UI development. For styling, I use SCSS variables to maintain consistency across designs. In Vanilla JavaScript, I build reusable functions that mimic React’s component-based architecture, ensuring flexibility and maintainability across projects.",
      gameProjects:[],
      articles:[],
      tools:['React','JavaScript','TypeScript','Python'],
      acquisitionDate:'December 2022'

    }

  ] 

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
  
  //skill name, domain,
// come back to this because we are chaning what we load in for skills
  // const toggleSkill = (skill) => {
  //   setActiveSkills(prevActiveSkills =>
  //     prevActiveSkills.includes(skill)
  //       ? prevActiveSkills.filter(s => s !== skill)
  //       : [...prevActiveSkills, skill]
  //   );
  // };

  // const filteredSkillsData = activeSkills.length
  //   ? skillsData.skillsData.filter(skill =>
  //       skill.tags.some(tag => activeSkills.includes(tag))
  //     )
  //   : skillsData.skillsData;
  



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
            <div className="filterSkillsOptions">
            <SelectDropdown options={sortedSkillNames} selectLabel='Filter by Skill Name'/>
            <SelectDropdown options={sortedDomainNames} selectLabel='Filter by Domain Name'/>
            <SelectDropdown options={sortedToolNames} selectLabel='Filter by Tool Name'/>
            <SelectDropdown options={sortedCoreOrSupporting} selectLabel='Filter by Core or Supporting Skill'/>
            <SelectDropdown options={sortedDates} selectLabel='Filter by Date'/>
            </div>
          </div>
        </div>
        <div className="techBucket">

        </div>


      </>
    );
}
        {/* <div className="techBucket">
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
        </div> */}
        {/* <div>
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
        </div> */}




