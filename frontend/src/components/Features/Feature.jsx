import React from 'react'
import FeatureCard from './FeatureCard'
const Feature = () => {


  
  return (
    <>

    <div className="container mt-3 mb-4">

    <h1  style={{fontSize:"31.5px",textTransform:"capitalize",
    fontFamily:"'Montserrat', sans-serif",marginTop:"0px",marginBottom:"20px",color:"#10161A",textAlign:"center",fontWeight:"700",lineHeight:"1.1",
    margin:"20px auto 0px",

    }} > 
    Our Features 

    </h1>
    <div style={{height:"5px",width:"40px",backgroundColor:"#10161A",margin:"auto" ,marginTop:"30px"}}></div>
    </div>

    <div className='d-flex justify-content-around flex-wrap mb-4'>

    <div>


    <FeatureCard header={"Stay Organized Like Never Before"} subheader={"Effortlessly manage your leads and opportunities in one central hub. Say goodbye to scattered information and missed follow-ups."}/>
    </div>


    <div>


    <FeatureCard header={"Real-Time Insights, Real-Time Success"} subheader={"Gain valuable insights into your leads' behaviors and interactions. Make informed decisions and close deals faster than ever."}/>
    </div>


    <div>

    <FeatureCard header={"Seamless Collaboration for Teams"} subheader={"Empower your team with collaborative tools that streamline communication and ensure no lead falls through the cracks."}/>
    </div>

    
    </div>
    

    </>



  )
}

export default Feature