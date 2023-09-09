export enum RoleType {
    User = 'USER',
    Admin = 'ADMIN',
}

export const RoleTypeLabelMapping: Record<RoleType, string> = {
    [RoleType.User]: "User",
    [RoleType.Admin]: "Admin",
};