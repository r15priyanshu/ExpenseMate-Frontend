export class RoleDto{
    public roleId?:string;
    public roleName:string;

    constructor(roleName:string){
        this.roleName=roleName;
    }
}