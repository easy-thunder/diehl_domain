
export default function Story(){
    return(
        <>
        <div className="story">
            <div className="photoContainer">

                <img src="/instructing.jpg"
                    alt="Instructing"
                    className="photoContainer__photo photoContainer__photo--p1"

// for vercel

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
                    <h2 className="story__text__title">Needs for any Business</h2>
                    <p className="story__text__paragraph">
                        Connection! Connection is the most important thing needed in our daily lives. Connection is the source of all our joys. A business without connection will struggle with communication and never clearly communicate to their clients.
                    </p>
                    <br/>
                    <br/>
                    <h2 className="story__text__title">How I connect</h2>
                    <p className="story__text__paragraph">
                     By having a clear path to conversion through design that lowers cognitive load. By utilizing instant messaging tools, video streaming tools and mailing lists to instantly connect the user to your website.
                    </p>
            </div>
        </div>
        </>
    )
}
