import FullStretchCard from "@/components/utility/button/fullStretchCard";

const data = [
  {
    title: "this is a test on 6/17",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
    tags: "Tag1, Tag2, Tag3",
    link: "/skills/test-skill",
    linkText: "Press for link"
  },{
    title: "zoom application",
    blurb: "Learn how to build a zoom application",
    tags: "EJS, WebRTC, object oriented",
    link: "/skills/zoom-application",
    linkText:"Explore making zoom"

}
];

export default function Skills() {
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