export default function Results(){
    return(
        <div className="results ">
            <div className="col-1-of-4">
                <div className="featureBox">
                    <i className="featureBox__icon icon-basic-rss "></i>
                    <h3 className="heading-tertiary">Connection</h3>
                    <p className="featureBox__text">Need an email list? I can use nodemailer for automated emails. Want instant messaging on your application? I can build with socket.io, SWR, or PeerJS with webRDS for video communication.</p>
                </div>
            </div>
            <div className="col-1-of-4">
                <div className="featureBox">
                    <i className="featureBox__icon icon-basic-smartphone "></i>
                    <h3 className="heading-tertiary">Dynamic Design</h3>
                    <p className="featureBox__text">Build with the ultimate customization. In styling have declared variables for spacing and color to easily resize from computer screen to phone or to easily compare color choices.</p>
                </div>
            </div>
            <div className="col-1-of-4">
                <div className="featureBox">
                    <i className="featureBox__icon icon-basic-cloud "></i>
                    <h3 className="heading-tertiary">Infinite scaling for your Business</h3>
                    <p className="featureBox__text">Build with multiple scalable technologies including AWS Lambda, SQL Aurora, and API gateway. NoSQL no problem as I'm also familiar with MongoDB.</p>
                </div>
            </div>
            <div className="col-1-of-4">
                <div className="featureBox">
                    <i className="featureBox__icon icon-basic-lock "></i>
                    <h3 className="heading-tertiary">Security</h3>
                    <p className="featureBox__text">Ensure that your users passwords are encrypted using Bcrypt. Ensure that your API keys are safely locked away in environment variables.</p>
                </div>
            </div>
        </div>
    )
}


