import api from "./axios";
import type { JobsResponse ,CreateJobPayload } from "../types/job";

export const getAllJobs = async():Promise<JobsResponse> => {
    const response = await api.get<JobsResponse>("/jobs")

    return response.data;
}

//get single job
export const getJobById = async(jobId : string) => {
    const response = await api.get(`/jobs/${jobId}`);

    return response.data
}

//create job
export const createJob = async(data : CreateJobPayload) => {
    const response = await api.post("/jobs/create" , data);

    return response.data;
}

//update job
export const updateJob = async(data : CreateJobPayload, jobId : string) => {
    const response = await api.put(`/jobs/${jobId}` , data);

    return response.data;
}

//delete job
export const deleteJob = async(jobId : string) => {
    const response = await api.delete(`/jobs/${jobId}`);

    return response.data;
}