
import './App.css';
// import { ProgressBar } from 'react-bootstrap';
import Dashbord from './components/Dashbord/Dashbord';
import Navbar from './components/Navbar/Navbar';
import FilteredResult from './components/FilteredResult/FilteredResult';
import DashbordProvider from './contex/dashbordContex';
import {BrowserRouter,Route,Routes} from "react-router-dom"


function App(props) {

  return (
    <BrowserRouter >
    <DashbordProvider >
    <Navbar />
    <Routes>
    <Route exact path="/" element={<FilteredResult />} />
      <Route  path='/dashbord' element={<Dashbord /> } />
    </Routes>
   
    </DashbordProvider>
    </BrowserRouter>
    
 
   
  );
}

export default App;
