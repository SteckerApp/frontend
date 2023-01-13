
import {RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router'
import AuthService from "@/services/auth-service"
import * as HelperService from '@/services/helper-service'
import axios from 'axios'

interface MiddlewareFactoryContext {
    router?:Router,
    store:any,
    from:RouteLocationNormalized,
    to:RouteLocationNormalized,
    next:NavigationGuardNext,
}

export const RequiredAuth = ({ next, router}:MiddlewareFactoryContext)=>{
    if(AuthService.isLoggedIn()){
        router?.push({name:"Admin.Dashboard"});// Note: change this to default logged in page
    }
    return next();
}

export const PreventAuth = ({ next, router }:MiddlewareFactoryContext)=>{
    if(!AuthService.isLoggedIn()){
        router?.push({name:"Auth.Login"});
    }
    return next();
}

export const GetVisitorInfo = ({ next }:MiddlewareFactoryContext)=>{
    const visitorInfo = HelperService.getLocalStorageItem('@visInfo')
    if(!visitorInfo){
        axios.get('https://ipinfo.io/').then((res:any)=>{
            HelperService.setLocalStorageItem('@visInfo',res.data)
        })
    }
    return next();
}

export function Auth({ next, router ,to}:MiddlewareFactoryContext) {
    // redirect to login page if not logged in and trying to access a restricted page
    const currentUser = {
        id:1, 
        username:'admin', 
        email:'admin@admin.com', 
        first_name:'Admin',
        last_name:'Admin',
        roles:['admin','employee'],
        permissions:['can_create','can_edit','can_delete']
    };

    if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return next({ path: '/login', query: { returnUrl: to.path } });
    }
    type AuthRolesAndPermission = {roles:Array<string>,permissions:Array<string>};
    const authorize: AuthRolesAndPermission | undefined = to.meta.authorize as AuthRolesAndPermission;
    
    if (authorize?.roles) {
        const roles = authorize.roles
        // check if route is restricted by role
        if (roles.length && !roles.some((role:string)=>currentUser.roles.includes(role))) {
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }
    if (authorize?.permissions) {
        const permissions = authorize.permissions
        // check if route is restricted by permission
        if (permissions.length && !permissions.some((permission:string)=>currentUser.permissions.includes(permission))) {
            // permission not authorised so redirect to home page
            return next({ path: '/' });
        }
    }

    next();
}
