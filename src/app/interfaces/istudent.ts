export interface IStudent {
    id?: string;
    studentId: string;
    name: string;
    email: string;
    dob: Date;
    courses?: string[];
}
