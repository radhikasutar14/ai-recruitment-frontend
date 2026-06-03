export interface Recruiter{
    _id : string;
    name : string;
    email :  string
}
export interface Job {
    _id : string,
    title : string,
    company : string,
    location : string,
    description?: string;
    skills?: string[];
    recruiter?: Recruiter;
    applicantCount? : number
}

