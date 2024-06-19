
import FullStretchCard from "@/components/utility/button/fullStretchCard";

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
          blurb: "Enjoy this classic game with your friends online. To play you and one other friend must click join game(on two different tabs).",
          tags: "useSWR, online, turn-based",
          link: "/games/ConnectFour",
          linkText:"Play Connect4"
      
      },{
          title: "Pentago",
          blurb: "In Pentago you are trying to connect five in a row. The player gets to choose a cell to play in and then after that you click and drag the board to spin it. Unlike connect 4 this game does not have an array state for game instances. Therefore only two players in the whole world can play at a time. To play you must have one other client connect on a different tab, browser, or simply send them the url.",
          tags: "useSWR, online, turn-based",
          link: "/games/pentago",
          linkText:"Play Pentago"
      
      },
      {
          title: "checkers",
          blurb: "This is a local multiplayer game. Take turns with a friend on one tab.",
          tags: "local-game, board-game, turn-based",
          link: "/games/checkers",
          linkText:"Play Checkers"
      
      },

      ];





    return (
        <>
          {data.map((node, index) => (
            <FullStretchCard
              key={index}
              title={node.title}
              blurb={node.blurb}
              tags={node.tags}
              link={node.link}
              linkText={node.linkText}
            />
          ))}
        </>
      );
}


