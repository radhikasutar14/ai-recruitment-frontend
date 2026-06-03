import { useEffect, useState } from "react";
import { getAllJobs } from "../api/jobApi";
import JobCard from "../components/JobCard";
import type { Job } from "../types/job";

const Home = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    
    const fetchJob = async() => {
        try{
            const response = await getAllJobs();

            setJobs(response.jobs)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchJob()
    },[]) 

    return (
        <div className="min-h-screen bg-gray-200 p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Latest Jobs</h1>

            <div className="grid md-grid-cols-2 lg-grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <JobCard
                        key={job._id}
                        _id={job._id}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        skills={job.skills}
                    />
                ))}
            </div>
        </div>
    )
};
export default Home;