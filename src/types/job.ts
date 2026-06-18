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
    applicantCount? : number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface JobCardProps {
  _id: string;
  title: string;
  company: string;
  location: string;
  skills?: string[];
}


export interface CreateJobPayload {
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
}

export interface JobsResponse {
  count: number;
  jobs: Job[];
}