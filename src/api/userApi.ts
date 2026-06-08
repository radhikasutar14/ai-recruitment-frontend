import api from "./axios";

export const uploadResume = async(formData : FormData) => {
    const response = await api.post("users/upload-resume",
        formData,
        {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }
    )

    return response.data;
}

