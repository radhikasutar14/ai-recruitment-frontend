import { useState, useEffect } from "react";
import { getSavedJobs, removeSavedJob } from "../api/savedJobApi";
import { applyJob } from "../api/applicationApi";
import useAuthStore from "../store/authStore";
import type { Job } from "../types/job";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorHandler";

interface SavedJob {
    _id: string;
    job: Job;
}
const SavedJob = () => {
    const {token} = useAuthStore();
    const [savedJobs , setSavedJob] = useState<SavedJob[]>([]);
    const [loading, setLoading] = useState(false)

    const fetchSavedJob = async() => {
        try{
            setLoading(true)
            const response = await getSavedJobs();

            setSavedJob(response);
        }catch(error){
            toast.error(getErrorMessage(error));
        }finally{
            setLoading(false)
        }
    }

    const handleRemove = async(jobId : string) => {
        try{
            const response = await removeSavedJob(jobId);

            toast.success(response.message);

            setSavedJob((prev)=>
                prev.filter((item) => item.job._id !== jobId))

        }catch(error){
            toast.error(getErrorMessage(error));
        }
    }
    
    const handleApply = async(jobId : string) => {
        try{
            if (!token) {
                toast.error("Please login first");
                return;
            }
            const response = await applyJob(jobId,token);

            toast.success(response.message);

            setSavedJob((prev) =>
            prev.filter((item) => item.job._id !== jobId)
        );

        }catch(error){
            toast.error(getErrorMessage(error));
        }
    }

    useEffect(() => {
        fetchSavedJob()
    },[]);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }
    return(
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8">
                Saved Jobs
            </h1>

            <div className="space-y-6">
                {savedJobs.map((saved) => (
                    <div
                        key={saved._id}
                        className="bg-white p-6 rounded-lg shadow"
                    >
                        <h2 className="text-2xl font-bold">
                            {saved.job.title}
                        </h2>

                        <p>{saved.job.company}</p>

                        <p>{saved.job.location}</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => handleApply(saved.job._id)}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Apply
                            </button>

                            <button
                                onClick={() => handleRemove(saved.job._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SavedJob;