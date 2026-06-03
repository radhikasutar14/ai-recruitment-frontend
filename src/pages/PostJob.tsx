import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../api/jobApi";
import toast from "react-hot-toast";

const PostJob = () => {
    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        title : "",
        company : "",
        location : "",
        description : "",
        skills : "",
        salary : ""
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log("submitted")
        try{
            const jobData = {
                ...formData,
                skills : formData.skills
                            .split(",")
                            .map((skill) => skill.trim())
            };

            const response = await createJob(jobData)

            toast.success(response.message);

            navigate("/recruiter-dashboard")
        }catch(error: any){
            console.log(error.response?.data);
            toast.error(
                error?.response?.data?.message || "Failed to create job"
            );
        }
    }
    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <form onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                    <h1 className="text-3xl font-bold mb-6">Post a new Job</h1>

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
                        Post Job
                    </button>

                    </div>
            </form>
        </div>
    )
}

export default PostJob;