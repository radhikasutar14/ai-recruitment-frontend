import type { Job } from "./job";

export interface Candidate {
    _id : string;
    name : string;
    email : string;
    role : string
}
export interface Application {
    _id : string,
    status : string,
    job : Job,
    candidate : Candidate
}