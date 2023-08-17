import { Task } from "./task";

export interface User {
    id?: string;
    username: string;
    tasks: Task[]
}