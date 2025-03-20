
export default function Story(){
    return(
        <>
            <h3 className="pageTitle">My Character</h3>
        <div className="story">
            <div className="photoContainer">

                <img src="/instructing.jpg"
                    alt="Instructing"
                    className="photoContainer__photo photoContainer__photo--p1"
                />

                <img src="/Jake rafting.png"
                        alt="Picture of the author"

                        className="photoContainer__photo photoContainer__photo--p2"
                />

                <img src="/raftingDownSanJuan.jpg"
                        alt="Rafting down Sanjuan"
                        className="photoContainer__photo photoContainer__photo--p3"
                />
            </div>
            <div className="story__text">
                    <h2 className="story__text__title">My History of Perseverance</h2>
                    <p className="story__text__paragraph">
                        As a young man I dreamed of being a white water rafting guide. I had no money, no car, and I lived 12 miles from an outfitter. So every day I would bike 24 miles to raft 40 miles for training, all while barely making ends meet. But with persistence I learned that I could make any dream a reality. 
                    </p>
                    <br/>
                    <br/>
                    <h2 className="story__text__title">How Perseverance applies to tech</h2>
                    <p className="story__text__paragraph">
                        I entered the tech field knowing the current saturation of the market. Every day I spend time on Udemy learning new skills or honing the ones I already have. When I found my first role at Novata I knew I had turned the "impossible" to "possible", and it is all thanks to perseverance.
                    </p>
            </div>
        </div>
        </>
    )
}
