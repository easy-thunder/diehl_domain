import Link from "next/link";

export default function FullStretchCard({ title, blurb, tags, link, linkText }) {
  return (
    <div className="fullStretchContainer">
      <div className="fullStretchInner">
        <h2 className="fullStretchTitle">{title}</h2>
        <p className="fullStretchBlurb">{blurb}</p>
        <div className="fullStretchTags">{tags}</div>
        <Link href={link}>
          <button className="fullStretchButton">{linkText}</button>
        </Link>
      </div>
    </div>
  );
}