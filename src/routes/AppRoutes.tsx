import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CandidateDashboard from "../pages/CandidateDashboard";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import JobApplication from "../pages/JobApplication";
import EditJob from "../pages/EditJob";
import PostJob from "../pages/PostJob";
import SavedJob from "../pages/SavedJobs";
import ResumeUpload from "../pages/ResumeUpload";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/applications/:jobId"
        element={<JobApplication />}
      />

      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute role="candidate">
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/post-job" element={<PostJob />} />

      <Route
        path="/edit-job/:jobId"
        element={<EditJob />}
      />

      <Route
        path="/saved-jobs"
        element={<SavedJob />}
      />

      <Route
        path="/upload-resume"
        element={<ResumeUpload />}
      />
    </Routes>
  );
};

export default AppRoutes;