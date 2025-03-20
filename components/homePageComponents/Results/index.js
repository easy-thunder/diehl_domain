export default function Results(){
    return(
        <div className="results ">
            <h3 className="pageTitle pageTitle__white">Capabilities at a glance</h3>

            <div className="featureBoxContainer">
                    <div className="col-1-of-4">

                        <div className="featureBox">
                            <i className="featureBox__icon icon-basic-rss "></i>
                            <h3 className="heading-tertiary">Connection</h3>
                            <p className="featureBox__text">Require an email list? I utilize Nodemailer for automated emails. Need real-time messaging in your application? I can integrate Socket.io, SWR, or PeerJS for video communication using WebRTC</p>
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <div className="featureBox">
                        <i className="featureBox__icon icon-basic-smartphone "></i>
                        <h3 className="heading-tertiary">Dynamic Design</h3>
                        <p className="featureBox__text">Crafted for ultimate customization, styling packages include predefined variables for spacing and color, ensuring seamless resizing from desktop to mobile and effortless comparison of color choices.</p>
                        </div>
                        </div>
                    <div className="col-1-of-4">
                        <div className="featureBox">
                            <i className="featureBox__icon icon-basic-cloud "></i>
                            <h3 className="heading-tertiary">Infinite scaling for your Business</h3>
                            <p className="featureBox__text">Capable of building with versatile and scalable technologies such as AWS Lambda, SQL Aurora, and API Gateway. Familiar with MongoDB for NoSQL solutions.</p>
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <div className="featureBox">
                            <i className="featureBox__icon icon-basic-lock "></i>
                            <h3 className="heading-tertiary">Security</h3>
                            <p className="featureBox__text">Secure your users' passwords with robust encryption using Bcrypt. Safeguard your API keys in secure environment variables for utmost protection.</p>
                        </div>
                    </div>
            </div>
        </div>
    )
}


