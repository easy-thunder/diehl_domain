import React from 'react'
import LightButton from "@/components/utility/button/lightButton"
import DarkButton from "@/components/utility/button/darkButton"
import Link from "next/link"
export default function Hero(){
    return(
    <>
        <div className="backgroundImageContainer" >

          <div className="backgroundImageContainer__titlesBox">
          <h1 className="backgroundImageContainer__titlesBox__title">
Meet Jake
</h1>
<i className="backgroundImageContainer__titlesBox__subTitle">
Discover my skills, explore my projects, and learn how I can help you connect your services to your clients.
</i>
                <div className="backgroundImageContainer__titlesBox__buttonBox">
                    <Link href="/skills">
                    <LightButton content={'skills'}/>
                    </Link>
                    <a href="/JD_SWENG_RES.pdf" download="/JD_SWENG_RES.pdf">
                        <DarkButton content={'Resume'} clicking={undefined} />
                    </a>               
                </div>
            </div>



        </div>



    </>
    )
}