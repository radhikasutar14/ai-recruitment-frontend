import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../api/jobApi";
import toast from "react-hot-toast";

const EditJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        title : "",
        company : "",
        location : "",
        description : "",
        skills : "",
        salary : ""
    });

    const fetchJob = async() => {
        try{
            const response =  await getJobById(jobId!);

            setFormData({
                title : response.title || "",
                company : response.company || "",
                location : response.location || "",
                description : response.description || "",
                skills : response.skills?.join(", ") || "",
                salary : response.salary || ""
        })
        }catch(error){[
            console.log(error)
        ]}
    }

    useEffect(() => {
        fetchJob()
    },[]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const updateData = {
                ...formData,
                skills : formData.skills
                            .split(",")
                            .map((skill) => skill.trim())
            };

            await updateJob(updateData, jobId!)

            toast.success("Please login first");

            navigate("/recruiter-dashboard")
        }catch(error){
            toast.error("Failed to update job")
        }
    }
    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <form onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                    <h1 className="text-3xl font-bold mb-6">Edit Job</h1>

                    <div className="space-y-4">
                        <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills separated by comma"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        className="w-full border p-3 rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded"
                    >
                        Update Job
                    </button>

                    </div>
            </form>
        </div>
    )
}

export default EditJob;