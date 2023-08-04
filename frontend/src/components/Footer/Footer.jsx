import React from 'react'
import { Link,useNavigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faCoffee, faUser);
const Footer = () => {
  return (
    <>
    <div className="section-headr text-center" style={{position:"relative",marginBottom:"60px",textAlign:"center",
fontFamily:"Varela Round', sans-serif",fontSize:"16px",lineHeight:"1.6",color:"#868F9B"}}>

        <h2 className='title' style={{fontSize:"31.5px",textTransform:"capitalize",
    fontFamily:"'Montserrat', sans-serif",marginTop:"0px",marginBottom:"20px",color:"#10161A",textAlign:"center",fontWeight:"700",lineHeight:"1.1",
    margin:"20px auto 0px",

    }}>Get in touch</h2>

    <div style={{height:"5px",width:"40px",backgroundColor:"#6195FF",margin:"auto" ,marginTop:"30px"}}></div>

    </div>
    <div className="container d-flex  justify-content-around flex-wrap">



    <div className="col-sm-4" style={{position:"relative"
,minHeight:"1px",paddingRight:"15px",paddingLeft:"15px",fontFamily:"'Varela Round', sans-serif"
,fontSize:"16px",lineHeight:"1.6"}}>

        <div className="contact" style={{textAlign:"center" ,margin:"15px 0px" ,color:"#868F9B"}}>
            
            <i class="fa fa-phone" style={{fontSize:"36px",color:"#6195FF" ,marginBottom:"20px"}}></i>
            <h3 style={{fontSize:"21px",fontFamily:"Montserrat', sans-serif",
        fontWeight:"700",marginTop:"0px",
        marginBottom:"20px",color:"#10161A"}}>Phone</h3>
            <p>+91-7061784317</p>
        </div>
    </div>

    <div className="col-sm-4" style={{position:"relative"
,minHeight:"1px",paddingRight:"15px",paddingLeft:"15px",fontFamily:"'Varela Round', sans-serif"
,fontSize:"16px",lineHeight:"1.6"}}>

        <div className="contact" style={{textAlign:"center" ,margin:"15px 0px" ,color:"#868F9B"}}>
        <i class="fa fa-envelope" style={{fontSize:"36px",color:"#6195FF" ,marginBottom:"20px"}}></i>

        <h3 style={{fontSize:"21px",fontFamily:"Montserrat', sans-serif",
        fontWeight:"700",marginTop:"0px",
        marginBottom:"20px",color:"#10161A"}}>Email</h3>
            <p>purushpawan@gmail.com</p>
        </div>
    </div>



    <div className="col-sm-4" style={{position:"relative"
,minHeight:"1px",paddingRight:"15px",paddingLeft:"15px",fontFamily:"'Varela Round', sans-serif"
,fontSize:"16px",lineHeight:"1.6"}}>

        <div className="contact" style={{textAlign:"center" ,margin:"15px 0px" ,color:"#868F9B"}}>
        <i class="fa fa-map-marker" style={{fontSize:"36px",color:"#6195FF" ,marginBottom:"20px"}}></i>

        <h3 style={{fontSize:"21px",fontFamily:"Montserrat', sans-serif",
        fontWeight:"700",marginTop:"0px",
        marginBottom:"20px",color:"#10161A"}}>Address</h3>
            <p>National Institute of Technology</p>
        </div>
    </div>
   
   
    </div>

    <div>

    <div  style={{backgroundColor:"rgb(17, 15, 36)",height:"200px",width:"100%"}}id="footer">
    {/* <div className="" to="/" style={{fontSize:"1.2rem" ,marginLeft:"15px" ,color:"white",alignItems:"centre" ,textAlign:"center",backgroundColor:"red",width:"100%",height:"100%" }}>
     <h4 style={{}}>LeadTrackr</h4>
    </div> */}
    </div>
    </div>
    </>
  )
}

export default Footer