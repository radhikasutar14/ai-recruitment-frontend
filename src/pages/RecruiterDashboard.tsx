import { useEffect , useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { deleteJob, getAllJobs } from "../api/jobApi";
import useAuthStore from "../store/authStore";
import type { Job } from "../types/job";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorHandler";

const RecruiterDashboard = () => {
    const [jobs , setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [search ,  setSearch] = useState("");
    const [currentPage , setCurrentPage] = useState(1);
    const jobsPerPage = 5;
    const {user} = useAuthStore();

    const fetchRecruiterJob = async() => {
        setLoading(true);
        try{
            const response = await getAllJobs();

            console.log("API response:", response);
            console.log("User:", user);
            const jobs = response?.jobs || response || [];

            const recruiterJobs = jobs.filter(
                (job: Job) =>
                    job.recruiter?._id === user?._id
            );
            response.jobs.forEach((job: Job) => {
                console.log("Job recruiter:", job.recruiter?._id);
                console.log("Logged user:", user?._id);
            });
            setJobs(recruiterJobs)
            //setJobs(response.jobs)
        }catch(error){
             toast.error(getErrorMessage(error));
        }finally {
            setLoading(false);
        }
    }
    //----------------useMemo--------------------
    const filteredJob = useMemo(() => {
        return jobs.filter((job) => {
            const keyword = search.toLowerCase();

                return(
                   job.title.toLowerCase().includes(keyword) ||
                   job.company.toLowerCase().includes(keyword) ||
                   job.location.toLowerCase().includes(keyword)
                )
            }
        )
    },[jobs , search]);

    //---------------Pagination------------------
    const totalPages = Math.ceil(filteredJob.length / jobsPerPage);

    const currentJob = useMemo(() => {
        const startIndex = (currentPage - 1) * jobsPerPage;

        const endIndex = startIndex +  jobsPerPage;

        return(
            filteredJob.slice(startIndex , endIndex)
        )
    },[filteredJob , currentPage])

    const handleDelete = async(id : string) => {
        try{
            await deleteJob(id);
            setJobs((prev) => prev.filter((j) => j._id !== id))

            toast.success("Job deleted")
        }catch(error){
           toast.error(getErrorMessage(error));
        }
        
    }
    
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    useEffect(() => {
        if (!user?._id) return;

        fetchRecruiterJob();

    },[user?._id])

    if (loading) {
    return <div className="p-8">Loading jobs...</div>;
    }

    return(
        <div className="p-8 bg-gray-100 min-h-screen">
           <h1 className="text-4xl font-bold mb-8">Recruiter Dashboard</h1>
           <div className="space-y-6">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                />
                {filteredJob.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">
                        No jobs found
                    </p>
                )}
            </div>
                {currentJob.map((job) => (
                    <div 
                    key={job._id}
                    className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold">{job.title}</h2>
                        <p className="text-gray-600 mt-2">{job.company}</p>
                        <p className="text-gray-500">{job.location}</p>
                        <p className="mt-2 text-sm-medium text-blue-600">
                            Applicants : {job.applicantCount || 0}
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Link to={`/applications/${job._id}`}
                             className="bg-blue-500 text-white px-4 py-2 rounded">View Application</Link>

                            <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                                <Link
                                    to={`/edit-job/${job._id}`}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                                >
                                    Edit
                                </Link>
                            </button>
                            <button 
                            onClick={() => handleDelete(job._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center gap-2 mt-8">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setCurrentPage(index + 1)
                            }
                            className={`px-4 py-2 rounded ${
                                currentPage === index + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
           </div>
        </div>
    );
};

export default RecruiterDashboard;