import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Leads from './components/Leads/Leads';
import Navbar from './components/Navbar/Navbar';
import UserRegister from './components/Register/Registation';
import UserLogin from './components/Login/Login';
// import Dashboard from './components/Dashboard/Dashboard';
import Communicaion from './components/Communctioa.jsx/Communicaion';
// import TicketPage from './components/TicketPage';
import TicketPage from './components/TicketPage/TicketPage';
import HomePage from './components/Homepage/Background';
import AppPage from './components/Homepage/Background';

function App() {

  
  return (
    <>
    <BrowserRouter>
    <Navbar/>
   
    
  
 
    <Routes>
    <Route  path="/" element={<HomePage/>}/>

    <Route  path="/leads" element={ <Leads/>}/>
    <Route  path="/register" element={ <UserRegister/>}/>
    <Route path="/login" element={ <UserLogin/>}/>

    <Route  path="/newlead/:leadId" element={ <TicketPage editMode={true}/>}/>
    <Route path="/communication/:leadId" element={<Communicaion/>}/>
    <Route path="/newlead" element={ <TicketPage/>}/>
    </Routes>
  
    </BrowserRouter>
 
    </>
      );
}

export default App;
