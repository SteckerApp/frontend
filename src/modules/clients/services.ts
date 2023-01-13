import {createRequest} from '@/services/http-process'
import {BrandFormType,WorkspaceTeamType} from './types'


export const getBrands = () => {
    return createRequest({ method: 'get', url: '/api/dashboard/brand' }, (res: any) => {
        return res.data.data
    })
}
export const saveBrand = (data:BrandFormType) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    return createRequest({ method: 'post', url: `/api/dashboard/brand`,data:data, headers: headers }, (res: any) => {
        return res.data
    })
}
export const editBrand = (brandId:number) => {
    return createRequest({ method: 'put', url: `/api/dashboard/brand/${brandId}` }, (res: any) => {
        return res.data.data
    })
}
export const deleteBrand = (brandId?:number) => {
    return createRequest({ method: 'delete', url: `/api/dashboard/brand/${brandId}` }, (res: any) => {
        return res.data
    })
}



export const getWorkspaceTeam = () => {
    return createRequest({ method: 'get', url: '/api/dashboard/teams' }, (res: any) => {
        return res.data
    })
}

export const addWorkspaceMember = (data:WorkspaceTeamType) => {
    return createRequest({ method: 'post', url: '/api/dashboard/teams/invite',data:data }, (res: any) => {
        return res.data.data
    })
}

export const deleteWorkspaceMember = (memberId?:number) => {
    return createRequest({ method: 'delete', url: `/api/dashboard/teams/${memberId}` }, (res: any) => {
        return res.data
    })
}