
import FullStretchCard from "@/components/utility/button/fullStretchCard";

export default function(){


    const data = [
        {
          title: "this is a test on 6/17",
          blurb: "I have just started this project on 6/17",
          tags: "Tag1, Tag2, Tag3",
          link: "/skills/test-skill",
          linkText: "Press for link"
        },{
          title: "Connect Four",
          blurb: "Enjoy this classic game with your friends online not configured for style. Just click join game and get on another tab and click join game and you can play with a friend.",
          tags: "Multi-Player, board-game, turn-based",
          link: "/games/ConnectFour",
          linkText:"Play Connect4"
      
      }
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


