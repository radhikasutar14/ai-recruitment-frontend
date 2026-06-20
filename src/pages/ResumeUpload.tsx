import { useState } from "react";
import { uploadResume } from "../api/userApi";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorHandler";

const ResumeUpload = () => {
    const [file , setFile] = useState<File | null>(null);

    const handleUpload = async() => {
        if(!file){
            toast.error("Please select a PDF");
            return
        }

        try{
            const formData = new FormData();

            formData.append("resume",file);

            const response = await uploadResume(formData);

            toast.success(response.message)
        }catch(error){
            toast.error(getErrorMessage(error));
        }
    }

    return(
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Upload Resume</h1>
            <input type="file" 
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}/>
            
            <button 
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded ml-4">
                    Upload
                </button>
        </div>
    )
}

export default ResumeUpload;