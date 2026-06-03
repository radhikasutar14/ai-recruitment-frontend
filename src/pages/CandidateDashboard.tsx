import { useEffect, useState } from "react";
import { getMyApplication } from "../api/applicationApi";
import type { Application } from "../types/application";

const CandidateDashboard = () => {
    const [applications , setApplications] = useState<Application[]>([]);
    const fetchMyJob = async() => {
        try{
            const data = await getMyApplication();

            setApplications(data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        fetchMyJob()
    },[])
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">My Application</h1>
            <div className="space-y-4">
                {applications
                .filter((application) => application.job)
                .map((application) => (
                    <div
                    key={application._id}
                    className="bg-white shadow-md rounded-lg p-6 border">
                        <h2 className="text-2xl font-semibold">{application.job.title}</h2>
                        <p className="text-gray-600 mt-2">{application.job.company}</p>
                        <p className="text-gray-500">{application.job.location}</p>
                        <div className="mt-4">
                            <span className="font-semibold">
                                Status : 
                            </span>
                            <span className="ml-2 text-blue-600 capitalize">{application.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CandidateDashboard;