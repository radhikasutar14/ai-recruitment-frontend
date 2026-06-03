import api from "./axios";

export const getAllJobs = async() => {
    const response = await api.get("/jobs")

    return response.data;
}

//get single job
export const getJobById = async(jobId : string) => {
    const response = await api.get(`/jobs/${jobId}`);

    return response.data
}

//create job
export const createJob = async(data : any) => {
    const response = await api.post("/jobs/create" , data);

    return response.data;
}

//update job
export const updateJob = async(data : any, jobId : string) => {
    const response = await api.put(`/jobs/${jobId}` , data);

    return response.data;
}

//delete job
export const deleteJob = async(jobId : string) => {
    const response = await api.delete(`/jobs/${jobId}`);

    return response.data;
}