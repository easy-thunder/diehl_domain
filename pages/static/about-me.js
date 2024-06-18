import Link from "next/link";
export default function AboutMe() {
    return (
      <div className="individualSkillContainer">
        <div className="individualSkillInner">
          <h2 className="individualSkillTitle">Hi, I'm Jake</h2>
          <img src="/jake fancy.jpg" alt="Jake" className="individualSkillImage"/>
          
          <p className="individualSkillParagraph">
            I am an extremely hard-working individual, always striving for excellence in everything I do. My dedication has been recognized multiple times, earning me the prestigious Employee of the Month award and accolades such as the "Biggest Heart of Gold" award. These honors reflect my commitment to not only achieving high standards but also fostering a positive and supportive environment for my colleagues.
          </p>
  
          <p className="individualSkillParagraph">
            Over the years, I have developed strong leadership skills, particularly through my experience as a rafting instructor. This role required me to navigate challenging situations and ensure the safety and enjoyment of all participants. It also honed my ability to communicate effectively and work well with a diverse range of people. I pride myself on being approachable and building strong rapport with everyone I meet.
          </p>
  
          <p className="individualSkillParagraph">
            Currently, I am employed at a company called Data Annotation, where I play a crucial role in training AI models. My primary duties involve prompting the AI, receiving two responses, and evaluating which one is better based on criteria such as helpfulness, safety, and verbosity. Additionally, I review and grade queries from other annotators, which provides me with valuable insights into different coding styles and techniques.
          </p>
  
          <p className="individualSkillParagraph">
            One area that I have particularly enjoyed exploring is working with Python and the Pandas library. This experience has deepened my understanding of data manipulation and analysis, which is essential for evaluating AI responses. The opportunity to learn from and contribute to a diverse range of coding approaches has been incredibly rewarding.
          </p>
  
          <p className="individualSkillParagraph">
            My daily routine reflects my commitment to continuous improvement and personal growth. Every day, I wake up early and go to the gym, where I make the most of my time by listening to Udemy classes on the treadmill. These classes help me stay updated on the latest technologies and methodologies, ensuring that I am always on the cutting edge of the industry. Since graduating from Flatiron Bootcamp for Software Engineers, I have completed 15 different Udemy courses, each contributing to my expanding skill set.
          </p>
  
          <p className="individualSkillParagraph">
            I am proficient in a variety of technologies, including Next.js, vanilla JavaScript, and modular coding practices. My expertise extends to numerous API tools such as Socket.io, PeerJS, and SWR. Additionally, I have experience configuring AWS Lambda layers, enabling CORS on API Gateway, and routing to various services via Lambda. My ability to adapt and master new technologies quickly makes me a valuable asset to any team.
          </p>
  
          <p className="individualSkillParagraph">
            While I may not have fully memorized Postgres, I have substantial experience working with it and can solve complex problems using its documentation. This experience includes tackling challenging LeetCode problems, which has further strengthened my problem-solving skills and understanding of database management.
          </p>
  
          <p className="individualSkillParagraph">
            One of my most significant projects was developing a web scraping Chrome extension that extracted data from LinkedIn. This extension matched user skills with job postings and generated personalized cover letters. By writing the majority of the cover letter and utilizing the GPT API to enhance coherence, the application successfully bypassed AI detection systems. This project not only showcased my technical skills but also my ability to create practical solutions that address real-world problems.
          </p>
  
          <p className="individualSkillParagraph">
            In summary, I am a dedicated and versatile professional with a proven track record of excellence in various roles. My technical expertise, combined with my strong leadership and interpersonal skills, positions me well to make meaningful contributions to any organization. I am excited about the opportunities ahead and look forward to leveraging my skills to drive innovation and success.
          </p>
  
          <Link href="/">
            <button className="backButton">Back to Home</button>
          </Link>
        </div>
      </div>
    );
  }