import Gender from "./Gender";
import Status from "./Status";

export default interface Employee
{
    id:number,
    name:string,
    email:string,
    gender:Gender,
    status:string
    created_at:Date,
    updated_at:Date
}