import { RoleType } from "../helpers/role-type";

export interface User {
    id: number;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    role: RoleType;
}

