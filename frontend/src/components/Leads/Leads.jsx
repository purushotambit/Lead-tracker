import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
 
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { MDBCol } from "mdbreact";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import styles from "./Leads.module.css";

const Leads = () => {
  let statusOption = [
    "None",
    "Contacted",
    "Not Contacted",
    "Contacted in Future",
  ];
  // console.log(statusOption);
  const navigate = useNavigate();

  let [leads, setLeads] = useState([]);
  let [status, setStatus] = useState("Pending");
  let [temp, setTemp] = useState([]);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

  let [searchPhrase, setSearchPhrase] = useState("");

  const sortById = () => {
    const leadsCopy = [...leads];

    leadsCopy.sort((userA, userB) => {
      if (sorted.reversed) {
        return userA.id - userB.id;
      }
      return userB.id - userA.id;
    });
    console.log(leadsCopy);
    setLeads(leadsCopy);
    setSorted({ sorted: "id", reversed: !sorted.reversed });
  };

  const sortByName = () => {
    const leadsCopy = [...leads];
    leadsCopy.sort((userA, userB) => {
      const fullNameA = `${userA.firstname} ${userA.lastname}`;
      const fullNameB = `${userB.firstname} ${userB.lastname}`;
      if (sorted.reversed) {
        return fullNameB.localeCompare(fullNameA);
      }
      return fullNameA.localeCompare(fullNameB);
    });
    setLeads(leadsCopy);
    setSorted({ sorted: "name", reversed: !sorted.reversed });
  };


  //SortbyDate
 
  

  const search = (event) => {
    const leadsCopy = [...temp];
    const matchedleads = leadsCopy.filter((lead) => {
      return `${lead.firstname} ${lead.lastname}`
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setLeads(matchedleads);
    console.log(matchedleads);
    setSearchPhrase(event.target.value);
  };

  const handleStatus = async (event, lead) => {
    const value = event.target.value;
    const name = event.target.name;

    lead.status = event.target.value;
    let index;

    for (let i = 0; i < statusOption.length; i++) {
      if (statusOption[i] == value) {
        index = i;
        break;
      }
    }

    lead.index = index;
    console.log(lead);
    const response = await axios.put(
      `https://lead-tracker-z8g5.onrender.com/api/leads/${lead._id}`,
      lead,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("devroom")}`,
        },
      }
    );
    const success = response.status === 200;
    if (success) {
      navigate("/leads");
    }
  };

  const Newlead = () => {
    navigate("/newlead");
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

  const fetchLeads = async () => {
    let { data } = await axios.get("https://lead-tracker-z8g5.onrender.com/api/leads/allLeads", {
      params: {
        page: 2,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("devroom")}`,
      },
    });

    setLeads(data.allLeads);
    setTemp(data.allLeads);

    // console.log(leads);
    let arr=data.allLeads;
    console.log("Kajal Kumari")
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {

      const utcDateString = arr[i].dueDate;
      const date = moment(utcDateString);
      const formattedDate = date.format("YYYY-MM-DD");

      arr[i].dueDate=formattedDate;
    }
    console.log("Purushotam Kumar");

    console.log(arr);
    console.log(temp);
    setLeads(arr);

    console.log(leads);
  };

  const handleDelete = async (leadId) => {
    console.log(leadId);
    const { data } = await axios.delete(
      `https://lead-tracker-z8g5.onrender.com/api/leads/${leadId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("devroom")}`,
        },
      }
    );
    fetchLeads();
  };

 
  useEffect(() => {

    if (localStorage.getItem("devroom")) {
      fetchLeads();
      
    }else{

      navigate("/login")
    }
    
  }, []);
  return (
    <>
      <MDBCol mt="5">
        <div className={styles.main}>
          <div className={styles.search}>
            <input
              className="form-control form-control-sm ml-3 w-75 input-sm pull-right"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={searchPhrase}
              onChange={search}
            />
          </div>
          <div>
            <Button className={styles.btn} onClick={Newlead}>
              Add Lead
            </Button>
          </div>
        </div>
      </MDBCol>

      <MDBTable align="middle">
        <MDBTableHead >
          <tr style={{fontFamily:"Roboto",fontSize:"1.3rem" }}>
            <th scope="col" onMouseEnter={renderArrow} onClick={sortByName}  >
              Name
              {sorted.sorted === "name" ? renderArrow() : null}{" "}
            </th>
            <th scope="col">Phone</th>
            <th scope="col">Status</th>
            <th scope="col" >Due Date
           
            </th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
            {/* <th scope='col' ></th> */}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {leads.map((lead, index) => {
            return (
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {lead.firstname + "    " + lead.lastname}
                      </p>
                      <p className="text-muted mb-0">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{lead.phone}</p>
                </td>
                <td>
                  <select
                    class="form-select form-select-sm"
                    aria-label="form-select-sm example"
                    onChange={(e) => handleStatus(e, lead)}
                    style={{ width: "175px" }}
                  >
                    {statusOption.map((value, index) => {
                      return lead.index === index ? (
                        <option value={statusOption[index]} selected>
                          {statusOption[index]}
                        </option>
                      ) : (
                        <option value={statusOption[index]}>
                          {statusOption[index]}
                        </option>
                      );
                    })}
                  </select>
                </td>

                <td>{lead.dueDate}</td>

                <td>{lead.description}</td>
                <div class="dropdown">
                  <Button
                    variant="light"
                    class="btn-dropdown-toggle"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </Button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link class="dropdown-item" to={`/newlead/${lead._id}`}>
                        Edit
                      </Link>
                    </li>
                    <li>
                      <Link
                        class="dropdown-item"
                        onClick={handleDelete.bind(this, lead._id)}
                      >
                        Delete
                      </Link>
                    </li>
                    <li>
                      <Link
                        class="dropdown-item"
                        to={`/communication/${lead._id}`}
                      >
                        Communication
                      </Link>
                    </li>
                  </ul>
                </div>
              </tr>
            );
          })}

          <tr></tr>
        </MDBTableBody>
      </MDBTable>
    </>
  );
};

export default Leads;
