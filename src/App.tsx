import {Routes , Route} from "react-router-dom";

import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import CandidateDashboard from "../src/pages/CandidateDashboard";
import RecruiterDashboard from "../src/pages/RecruiterDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import JobApplication from "./pages/JobApplication";
import Navbar from "./components/Navbar";
import EditJob from "./pages/EditJob";
import PostJob from "./pages/PostJob";

function App(){
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/applications/:jobId" element={<JobApplication />}/>
      <Route path="/candidate/dashboard" element={
          <ProtectedRoute role="candidate">
            <CandidateDashboard/>
          </ProtectedRoute>
        } 
        />
      <Route path="/recruiter/dashboard" element={
          <ProtectedRoute role="recruiter">
            <RecruiterDashboard/>
          </ProtectedRoute>
        } />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/edit-job/:jobId" element={<EditJob />} />
    </Routes>
    
    </>
  )
}

export default App;
