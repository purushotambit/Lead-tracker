import React from 'react'

import styles from './Background.module.css'
import { Link,useNavigate } from 'react-router-dom'

import Feature from '../Features/Feature'
import Footer from '../Footer/Footer'
const HomePage = () => {
    const navigate = useNavigate();
  return (
    <>
    
    <div style={{backgroundColor:"#110f24" ,width:"100%" ,height:"550px"}}>
   
  
    <div className={`${styles.upper}`}>

        <div className={`text-white  col-one-half middle  ${styles.upperfirst}`}>

            <h1 className={`${styles.hero}`}>Empower Your Leads Journey</h1>

            <p className={`${styles.lead}`}>Transform 
            leads into loyal customers with our advanced tracking and management platform.</p>
          {
            !localStorage.getItem("devroom")?(

              <button type="button" className="btn" style={{background:"#393ed8", width:'140px', 
              color:"white",
              marginLeft:"40px" ,borderRadius:"15px" ,fontSize:"1.2rem"}} onClick={() => navigate('/register')}>Get Started</button>
            ):(null)
          }
          
        
            
        </div>


        <div className={`col-one-half middle ${styles.upperlast}` }>

<img src="/image.png" alt="Hero Illustration" style={{width:"500px" ,height:"450px"}}/>
</div>
    </div>
    </div>

    <Feature/>
    <Footer/>

    </>
    
  )
}

export default HomePage