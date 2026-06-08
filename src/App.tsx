import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App(){
  return(
    <>
    <Navbar/>
    <AppRoutes />
    {/* <Routes>
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
      <Route  path="/saved-jobs" element={<SavedJob />}/>
      <Route path="/upload-resume" element={<ResumeUpload />}/>
    </Routes> */}
    
    </>
  )
}

export default App;
