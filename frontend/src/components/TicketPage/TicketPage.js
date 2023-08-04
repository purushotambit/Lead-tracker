import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams ,useLocation} from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";
import styles from './TicketPage.module.css';
const TicketPage = ({editMode}) => {
 
  
  const [formData, setFormData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
    source:"",
    description:"",
    status: 'not started',
    dueDate:"",
    progress: 0,
    timestamp: new Date().toISOString(),
  })
 
  const navigate = useNavigate()

  let { leadId } = useParams()

  console.log(leadId);
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log(formData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (editMode) {

      const response = await axios.put(`https://lead-tracker-z8g5.onrender.com/api/leads/${leadId}`,formData, {
       
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },


      })

      if (response.status == 201){
        Swal.fire("Lead Not exists","", "error");
        return;
      }else if(response.status == 200){
    
       
        navigate("/leads");
         Swal.fire("Lead Updated successful","", "success");
      } 
         
       else {
           Swal.fire("Oh no!", "Something went wrong! Try again", "error");
        }
    
     
    }

    if (!editMode) {
      
      
      console.log(formData);
      const response = await axios.post('https://lead-tracker-z8g5.onrender.com/api/leads/register', 
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("devroom")}`,
          },
        }

      )

      if (response.status == 201){
        Swal.fire("Lead already exists","", "error");
        return;
      }else if(response.status == 200){
    
       
        navigate("/leads");
         Swal.fire("Lead added successful","", "success");
      } 
         
       else {
           Swal.fire("Oh no!", "Something went wrong! Try again", "error");
        }
     
    }
  }

  const fetchData = async () => {
    const response = await axios.get(`https://lead-tracker-z8g5.onrender.com/api/leads/${leadId}`,{ 

    headers: {
      
      Authorization: `Bearer ${localStorage.getItem("devroom")}`,
    },
    })
    
    setFormData(response.data.lead)
  }


  
  useEffect(() => {

    if (localStorage.getItem("devroom")) {
      if (editMode) {
        fetchData()
      }
    
    }else{
      navigate("/login")
    }
    
  }, [])

  
  return (
  
    <div className={styles.ticket} >
      <h4>{editMode ? 'Update Your Lead' : 'Create a new Lead'}</h4>
      <div className="ticket-container">
        <form onSubmit={handleSubmit}>
          <section>
            <div className={styles.item}>
              
            <label for={styles.firstname}>First Name</label>
            <input
              id={styles.firstname}
              name="firstname"
              type="name"
              onChange={handleChange}
              required={true}
              value={formData.firstname}
            />

        <label for="lastname">Last Name</label>
            <input
              id="lastname"
              name="lastname"
              type="name"
              onChange={handleChange}
              required={true}
              value={formData.lastname}
            />




            {/* <label htmlFor="description">Description</label>
            <input
              leadId="description"
              name="description"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.description}
            /> */}
            </div >
            <div className={styles.item}>

             <label htmlFor={styles.email}>Email</label>

             <input type="email" id={styles.email} name="email"   
             onChange={handleChange}
             required={true}
             value={formData.email}/>
            </div>

            <div className={styles.item}>


             <label htmlFor={styles.phone}>Phone No</label>

             <input type="text" id={styles.phone} name="phone"   
             onChange={handleChange}
             required={true}
             value={formData.phone}/>
            </div>
             
            <div className={styles.item}>


              <label htmlFor={styles.source}>Source</label>
              <input type="text" id={styles.source} name="source"   
             onChange={handleChange}
             required={true}
             value={formData.source}/>
            </div>


            <div className={styles.item}>


              <label htmlFor={styles.description}>Description</label>
              <input type="text" id={styles.description} name="description"   
             onChange={handleChange}
             required={true}
             value={formData.description}/>
            </div>


            <div className={styles.item}>


              <label htmlFor={styles.duedate}>DueDate</label>
              <input type="date" id={styles.duedate} name="dueDate"   
              onChange={handleChange}
              required={true}
             value={formData.dueDate}/>
            </div>

            

            
            <div className={styles.item}>

            <input type="submit"  id={styles.button} className='btn btn-primary btn-sm h-auto w-20'/>
            </div>
           
          </section>
        </form>
      </div>
    </div>
  )
}

export default TicketPage
