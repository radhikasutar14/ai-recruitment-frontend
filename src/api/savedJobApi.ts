import api from "./axios";


//apply for save job
export const savedJob = async(jobId : string) => {
    const response = await api.post(`/saved-jobs/${jobId}`);

    return response.data
}

//get all saved jobs
export const getSavedJobs = async() => {
    const response = await api.get("/saved-jobs");

    return response.data
}


//remove saved jobs
export const removeSavedJob = async(jobId : string) => {
    const response = await api.delete(`/saved-jobs/${jobId}`);

    return response.data
}