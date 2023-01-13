import {createRequest} from '@/services/http-process'

export const getDashboardData = () => {
    return createRequest({ method: 'get', url: '/api/dashboard' }, (res: any) => {
        return res.data
    })
}
export const getUserProfile = () => {
    return createRequest({ method: 'get', url: '/api/auth/user/profile' }, (res: any) => {
        return res.data
    })
}
export const safeUserProfile = (data:any) => {
    return createRequest({ method: 'put', url: '/api/auth/user/profile', data:data }, (res: any) => {
        return res.data
    })
}