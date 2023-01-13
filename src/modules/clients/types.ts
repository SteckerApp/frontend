export type BrandFormType = {
    /* name?:string;
    industry?:string;
    description?:string;
    website?:string;
    audience?:string;
    colors?:string[];
    attachments?:File[]; */

    name:string;
    industry:string;
    description:string;
    website:string;
    audience:string;
    colors:string[];
    attachments:File[];
}

export type WorkspaceTeamType = {name:string,email:string,role:string}

export type NewProjectFormType = {
    title:string;
    description:string;
    dimensions:{width:string,height:string}[];
    links:{name:string}[];
    colors:string[];
    attachments:File[];
    brand:any;
    deliverables:any;
}