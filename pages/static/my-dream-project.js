import Link from "next/link";

export default function MyDreamProject() {
  return (
    <div className="individualSkillContainer">
      <div className="individualSkillInner">
        <h2 className="individualSkillTitle">LobbyLess&#40;Direct Democracy&#41;</h2>
        <p className="individualSkillParagraph">
        Direct democracy, where citizens have the direct power to decide on policy initiatives without intermediary representatives. It promises an inclusive and participatory system where every voice can be heard and every vote can count. However, as much as direct democracy is appealing in theory, it comes with several significant challenges that cannot be ignored. As an advocate for direct democracy, it is crucial to acknowledge these issues to present a balanced view and work towards viable solutions.        </p>
        
        <h2 className="individualSkillTitle" style={{scale: "1.2"}}>Challenges of Direct Democracy</h2>
        <h2 className="individualSkillTitle">Voter Fatigue and Apathy</h2>
        <p className="individualSkillParagraph">
        One of the most prominent challenges of direct democracy is voter fatigue. In a system where citizens are required to vote on numerous issues regularly, it is inevitable that some individuals will become overwhelmed or disinterested. This phenomenon can lead to voter apathy, where the engagement and participation rates plummet. When citizens feel inundated with constant decision-making demands, they might choose not to participate at all, which undermines the core principle of direct democracy—broad and active civic engagement.        </p>
        <h2 className="individualSkillTitle">Lack of Expertise</h2>
        <p className="individualSkillParagraph">
        Another critical concern is the lack of expertise among the general populace. Many policy issues, such as healthcare reform, economic strategies, and environmental regulations, require specialized knowledge and a deep understanding of complex systems. The average citizen may not possess the requisite expertise to make informed decisions on such matters. This knowledge gap can result in decisions that are not based on sound evidence or best practices, potentially leading to adverse outcomes for society.        </p>
        <h2 className="individualSkillTitle">Influence of Media and Information Bias</h2>
        <p className="individualSkillParagraph">
        In a direct democracy, the media plays a pivotal role in shaping public opinion. However, media sources can be biased or prone to disseminating misinformation. When citizens rely on such sources to make decisions, they may end up voting based on incomplete or incorrect information. The influence of media and information bias can thus distort the democratic process, leading to decisions that do not truly reflect the informed will of the people.        </p>
        <h2 className="individualSkillTitle">Tyranny of the Majority        </h2>
        <p className="individualSkillParagraph">
        One of the most significant risks in a direct democracy is the potential for the tyranny of the majority. When the majority imposes its will on the minority without adequate safeguards, it can lead to the oppression or neglect of minority groups and interests. This situation can exacerbate social divisions and undermine the principle of equal representation and fairness in democratic governance.        </p>
        <h2 className="individualSkillTitle">Responsibility and Accountability
        </h2>
        <p className="individualSkillParagraph">
        In representative democracies, elected officials are accountable for their decisions and actions. In a direct democracy, it can be challenging to hold individuals accountable for collective decisions. This diffusion of responsibility can lead to a lack of accountability and difficulty in addressing the consequences of poor decisions.
       </p>
        <h2 className="individualSkillTitle">Cost and Resource Intensity
        </h2>
        <p className="individualSkillParagraph">
        Administering frequent votes on various issues is resource-intensive. It requires significant financial, logistical, and administrative support. The costs associated with running regular votes can be substantial, diverting resources from other essential services and projects. This financial burden can be a significant drawback for implementing direct democracy on a large scale.      
         </p>
        <h2 className="individualSkillTitle" style={{scale:"1.2"}}>PROPOSED SOLUTIONS
        </h2>
        <h2 className="individualSkillTitle">Everyone Gets to Say What Bothers Them

        </h2>
        <p className="individualSkillParagraph">
        Everyone votes on their local, state, and federal budget for non-critical infrastructure. Roads, government IT, and anything else considered critical would not be included in the budget as resources would already be allocated to them. To determine whether something is critical, we need a 4:1 ratio of votes. Once a budget is established, those that only care about lowering their taxes can rest assured that they won’t be taxed more than what the budget allows for, and if that was all they cared about, then they don’t have to vote anymore.         </p>
        <h2 className="individualSkillTitle">Budget Issues
        </h2>
        <p className="individualSkillParagraph">
        Administering frequent votes on various issues is resource-intensive. It requires significant financial, logistical, and administrative support. The costs associated with running regular votes can be substantial, diverting resources from other essential services and projects. This financial burden can be a significant drawback for implementing direct democracy on a large scale.      
         </p>

            <h3 className="individualSkillTitle">Identification and Categorization of Issues:</h3>
        <p className="individualSkillParagraph">
          Everyone addresses six issues they have and labels them as local (2 issues), state (2 issues), or federal (2 issues). These are fed into a Large Language Model (LLM) to determine whether these issues can be grouped into categories or need separate categories. Similar issues are grouped, estimated by AI for cost, tagged by type, and tallied to sort the most pressing issues.
        </p>

        <h3 className="individualSkillTitle">Filtering and Engagement:</h3>
        <p className="individualSkillParagraph">
          Issues are posted with tags for easy filtering (e.g., medical, agriculture). They can be sorted by popularity or filtered by local, state, or federal relevance. Individuals can save issues they care about, like issues, comment, or propose solutions/strike-downs. Top two upvoted solutions are taken to vote, and AI can readjust cost estimates based on new solutions.
        </p>

        <h3 className="individualSkillTitle">Voting on Solutions:</h3>
        <p className="individualSkillParagraph">
          People vote on one of the top two solutions or whether the issue should be struck down. If not struck down, the issue is included in the budget. The budget will cover the like percentage on the issue. Any excess funds are placed in a pool to be reallocated for issues that were popular but underfunded.
        </p>

        <h3 className="individualSkillTitle">Reallocation Example:</h3>
        <p className="individualSkillParagraph">
          For example, with a $1000 budget and 100 total likes split unevenly between three issues (A: 50 likes, B: 30 likes, C: 20 likes), we allocate funds based on need and popularity. Excess funds are reallocated proportionally based on remaining like ratios.
        </p>

        <h3 className="individualSkillTitle">End-of-Year Adjustments:</h3>
        <p className="individualSkillParagraph">
          At the end of the year, total income is assessed to determine tax brackets and ensure adequate funding for the voted budget.
        </p>

        <h2 className="individualSkillTitle">Non-Budget Issues</h2>
        <p className="individualSkillParagraph">
          These are straightforward yes/no polls on issues like abortion legality, speed limits, or billionaire taxes. Simplicity is key, with values adjusted in fixed increments where applicable.
        </p>

        <h2 className="individualSkillTitle">Addressing Concerns</h2>
        <p className="individualSkillParagraph">
          <strong>Voter Fatigue:</strong> The algorithm helps solve voter fatigue by focusing on what matters to individuals.
        </p>
        <p className="individualSkillParagraph">
          <strong>Lack of Expertise:</strong> It's harder to lobby everyone than a few in power. The average collective judgment can often be close to the correct answer.
        </p>
        <p className="individualSkillParagraph">
          <strong>Tyranny of the Majority:</strong> This system ensures even small voices can be heard and funded if their issues are considered important.
        </p>

        <h2 className="individualSkillTitle">Conclusion</h2>
        <p className="individualSkillParagraph">
          Direct democracy has its challenges, but with thoughtful design and technology integration, it can be a robust system of governance that amplifies the voices of all citizens. By addressing these concerns head-on, we can create a more inclusive, participatory, and fair democratic process that truly represents the will of the people.
        </p>

         
        <Link href="/">
          <button className="backButton">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}