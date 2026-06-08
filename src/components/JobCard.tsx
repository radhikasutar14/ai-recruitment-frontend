import useAuthStore from "../store/authStore"
import { applyJob } from "../api/applicationApi";
import { savedJob } from "../api/savedJobApi";
import type { Job } from "../types/job";
import toast from "react-hot-toast";

const JobCard = ({
    _id,
    title, 
    company,
    location,
    skills} : Job) => {
    
    const { token , user} = useAuthStore();

    const handleApply = async() => {
        try{
            if(!token){
                toast.error("Please login first");
                return;
            }

            const response = await applyJob(_id, token)

            toast.success(response.message)
        }catch(error : any){
            toast.error(error?.response?.data?.message || "Something wnt wrong")
        }
    }
    
    const handleSaveJob = async() => {
        try{
            const response = await savedJob(_id);

            toast.success(response.message)
        }catch(error:any){
            toast.error(error?.response?.data?.message || "Something wnt wrong")
        }
    }
    return(
        <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>

            <p className="text-gray-600 mb-2">{company}</p>
            <p className="text-gray-500 mb-2">{location}</p>

            <div className="flex flex-wrap gap-2">
                {skills?.map((skill, index)=>(
                    <span key={index} className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm">
                        {skill}
                    </span>
                ))}
            </div>
            {user?.role == "candidate" && (
                <div className="flex gap-2 mt-4">
                <button 
                    className="bg-green-600 mt-4 text-white px-4 py-2 rounded"
                    onClick={handleApply}>
                        Apply
                </button>

                <button
                    onClick={handleSaveJob}
                    className="bg-blue-600 mt-4 text-white px-4 py-2 rounded">
                    Save Job
                </button>
                </div>
                
            )}
                
        </div>
    )
}

export default JobCard;