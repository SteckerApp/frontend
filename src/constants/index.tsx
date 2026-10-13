import { Icons } from './icons';
import { paths } from './paths';
import { Images } from './images';
import { apiPaths } from "./api"

const permissions = ["create", "read", "update", "delete"];

// Define a union type for individual roles
export type UserRoleType = "client" | "affiliate" | "admin";

const role: UserRoleType = "client"; 

// Export non-type values
export {
    paths,
    Icons,
    permissions,
    role,
    Images,
    apiPaths
};

