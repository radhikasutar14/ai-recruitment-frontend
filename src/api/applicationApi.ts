import api from "./axios";

export const applyJob = async (jobId : string, token : string) => {
    const response = await api.post(`/applications/apply/${jobId}`,
        {},
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
    );

    return response.data;
}

//for candidate view 
export const getMyApplication = async()  => {
    const response = await api.get(`/applications/my-applications/`);
    return response.data;
    
}

//for recruiter view 
export const getJobApplication = async(jobId : string) => {
    const response = await api.get(`/applications/job/${jobId}`);

    return response.data
}

//update application status
export const updateApplicationStatus = async(applicationId : string , status : string) => {
    const response = await api.put(`/applications/${applicationId}/status`,{status});

    return response.data
}