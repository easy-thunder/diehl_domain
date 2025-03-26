
import SkillCard from "@/components/utility/skillCard/skillCard";

export default function(){


    const data = [
        // {
        //   title: "chess",
        //   blurb: "This game does not have any back end server. To play all you have to do is click Play chess and you and a friend can take turns playing one another.NOTE that their is no logic for checks or check mates. There is also no game winning logic either.",
        //   tags: "HTML, CSS, Javascript",
        //   link: "/games/chess",
        //   linkText: "Play chess"
        // },
        {
          title: "Connect Four",
          blurb: "Enjoy this classic game with your friends online. To play you and one other friend must click join game(on two different tabs).Only Chrome can run!",
          tags: ["UseSWR", "React", "API"],
          link: "/games/ConnectFour",
          linkText: "Play Connect Four"      
      },{
          title: "Pentago",
          blurb: "In Pentago you are trying to connect five in a row. The player gets to choose a cell to play in and then after that you click and drag the board to spin it. Unlike connect 4 this game does not have an array state for game instances. Therefore only two players in the whole world can play at a time. To play you must have one other client connect on a different tab, browser, or simply send them the url.Only Chrome can run!",
          tags: ["UseSWR", "React", "API"],
          link: "/games/pentago", 
          linkText: "Play Pentago"     
      },
      {
          title: "Checkers",
          blurb: "This is a local multiplayer game. Take turns with a friend on one tab. Only Chrome can run!",
          tags: ["Local-Game", "React", "Turn-Based"],
          link: "/games/checkers",  
          linkText: "Play Checkers"    
      },

      ];





    return (
        <>
        <h2 className="pageTitle ">Projects</h2>
        <div className="projectsContainer">

          {data.map((node, index) => (
            <SkillCard
              key={index}
              title={node.title}
              information={node.blurb}
              mainListFeatures={node.tags}
              buttonLink={node.link}
              buttonText={node.linkText}
            />
          ))}
        </div>

        </>
      );
}


