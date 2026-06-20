import { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import { getJobApplication, updateApplicationStatus } from "../api/applicationApi";
import type { Application } from "../types/application";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorHandler";

const JobApplication = () =>{

    const { jobId } = useParams();
    const[ applications, setApplications] = useState<Application[]>([]);

    const fetchJobs = async() =>{
        try{
            if(!jobId) return;

            const data = await getJobApplication(jobId);
            
            setApplications(data)
        }catch(error){
             toast.error(getErrorMessage(error));
        }
    }

    const handleStatusChange = async(applicationId : string , status : string) => {
        try{
            await updateApplicationStatus(
                applicationId,
                status
            );

            setApplications((prev) => 
                prev.map((app) => 
                    app._id === applicationId ? {...app, status} : app
                ))

            toast.success("Application status is updated")
        }catch(error){
            toast.error(getErrorMessage(error));
        }
    }
    useEffect(() => {
        fetchJobs()
    },[fetchJobs])

    return(
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Job Applications</h1>
            <div className="spcae-y-6">
                {applications.map((application) => (
                    <div
                    key={application._id}
                    className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">{application.candidate.name}</h2>
                        <p className="text-gray-600 mt-2">{application.candidate.email}</p>
                        <p className="mt-3">
                            Status :  
                            <select value={application.status}
                            onChange={(e) => handleStatusChange(
                                application._id, e.target.value
                            )}
                            className="border rounded px-3 py-2 ml-2">
                                <option value="pending">Pending</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobApplication;