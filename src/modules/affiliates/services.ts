import {createRequest} from '@/services/http-process'

export const getAffiliateData = () => {
    return createRequest({ method: 'get', url: '/api/affilate/dashboard' }, (res: any) => {
        return res.data
    })
}