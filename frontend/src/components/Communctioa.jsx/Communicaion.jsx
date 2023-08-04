// import { useState } from 'react';
import React, { useEffect, useState } from "react";
import { Link, useNavigate ,useParams} from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import "./Communacation.css";
import moment from 'moment';
import axios from "axios";
import Button from 'react-bootstrap/Button';
const Communicaion = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState([]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  let { leadId } = useParams()

  const currentDate = new Date();
  const [formData, setFormData] = useState({
    date:currentDate,
    type: "",
    content: "",
    leadId:leadId,
  });

  const [commData, setCommData] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const fetchComms = async () => {
    let { data } = await axios.get(
      `https://lead-tracker-z8g5.onrender.com/api/comms/${leadId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("devroom")}`,
        },
      }
    );
 
    setCommData(data.comms);
    
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(formData)
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editMode) {
      const response = await axios.put(
        `https://lead-tracker-z8g5.onrender.com/api/comms/${leadId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("devroom")}`,
          },
        }
      );
      formData.date=currentDate;
      formData.type="";
      formData.content="";
      console.log(formData);
      const success = response.status === 200;
      if (success) {
        navigate(`/communication/${leadId}`);
      }
    }
    if (!editMode) {
      // console.log(formData);
      const inputDate=formData.date
      const momentDate = moment(inputDate);
      const formattedDate = momentDate.format('DD MMM YYYY');
      formData.date=formattedDate
      console.log(formattedDate)
      console.log(typeof formattedDate)
      console.log(formData)
      const response = await axios.post(
        "https://lead-tracker-z8g5.onrender.com/api/comms/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("devroom")}`,
          },
        }
      );

      formData.date=currentDate;
      formData.type="";
      formData.content="";
      // console.log(formData);
      const success = response.status === 200;
      if (success) {
        fetchComms();
      }
    }
  };

  const fetchbyId = async () => {
    const response = await axios.get(
      `https://lead-tracker-z8g5.onrender.com/api/comms/${leadId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("devroom")}`,
        },
      }
    );
   
    setFormData(response.data.lead);
  };

  const handleDelete = async (commId) => {

    const { data } = await axios.delete(
      `https://lead-tracker-z8g5.onrender.com/api/comms/${commId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("devroom")}`,
        },
      }
    );
    fetchComms();
  };


  const handleEdit= async (commId) => {
    console.log(leadId);
    const { data } = await axios.delete(
      `https://lead-tracker-z8g5.onrender.com/api/comms/${commId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("devroom")}`,
        },
      }
    );
    fetchComms();
  };

  useEffect(() => {
    if (localStorage.getItem("devroom")) {
      fetchComms();
     
    }else{
      navigate("/login")
    }

  }, []);
  return (
    <>
      
      <Button variant="outline-secondary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      className="mt-1" style={{marginLeft:"5px" ,width:"100px"}}>New</Button>
      
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{fontFamily:"Roboto"}}
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                New message
              </h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="date" class="col-form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    style={{ height: "30px" }}
                    onChange={handleChange}
                  />
                </div>

                <div class="form-group">
                  <label for="type" class="col-form-label">
                    Type:
                  </label>
                  <input
                    type="text"
                    class="form-control input-lg"
                    id="type"
                    name="type"
                    value={formData.type}
                    style={{ height: "30px" }}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label for="content" class="col-form-label">
                    Content:
                  </label>
                  <textarea
                    class="form-control"
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </form>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleSubmit}
                >
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table class="table"   style={{fontFamily:"Roboto" ,fontSize:"1.5rem"}}>
        <thead class="thead-dark">
          <tr style={{margin:"auto"}}>
            <th scope="col">Type</th>
            <th scope="col">Content</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {commData.map((comm, index) => {
            return (
              <tr style={{fontSize:"1.1rem",fontFamily:"Arial"}}>
                <td>
                  <p className="fw-bold mb-1">{comm.type}</p>
                </td>

                <td>
                  <p className="fw-bold mb-1">{comm.content}</p>
                </td>

                <td>
                  <p className="fw-bold mb-1">{comm.date}</p>
                </td>
                <td>
                <Button variant="light" onClick={handleDelete.bind(this, comm._id)} 
                style={{fontSize:"1.1rem",fontFamily:"Arial"}}>Delete</Button>
                  
                </td>

                <Link></Link>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Communicaion;
