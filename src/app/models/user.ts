import { RoleType } from "../helpers/role";

export class User {
    public id = -1;
    public username = '';
    public password = '';
    public firstname = '';
    public lastname = '';
    public email = '';
    public role!: RoleType;
}