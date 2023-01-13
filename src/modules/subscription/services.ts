import {createRequest} from '@/services/http-process'
import { setTransRef } from './helpers'

export const getSubscription = () => {
    return createRequest({ method: 'get', url: '/api/subscription' }, (res: any) => {
        return res.data
    })
}
export const createCart = (subscriptionId:number) => {
    return createRequest({ method: 'post', url: '/api/cart/create', data:{subscription_id:subscriptionId}}, (res: any) => {
        setTransRef(res.data?.data?.reference)
        return res.data
    })
}
export const getCart = (transRef:string) => {
    return createRequest({ method: 'get', url: `/api/cart/${transRef}` }, (res: any) => {
        return res.data
    })
}