export interface Task {
    _id?: string;
    createdBy: string;
    createdAt?: string;
    description: string;
    completed: boolean;
    completedAt?: string;
}