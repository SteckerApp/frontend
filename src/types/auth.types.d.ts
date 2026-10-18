


export interface LoginResponse {
  message: string
  data: Credentials
}

export interface AuthState {
  token: string | null
  refreshToken?: string | null
  user: User | null
  permissions: Permissions[] | null
  roles: string[] | null
}

export interface Credentials {
  token: string
  refreshToken?: string | null
  user: User 
  permissions: Permissions[] 
  roles: string[] 
}


 export  interface UserRoleType {
    userType?: "client" | "affiliate" | "admin" | string;
  }

 export interface LoginCredentials {
    user_type?: "client" | "affiliate" | "admin" | string;
    email: string;
    password: string;
  }

  export interface User {
    id: string | number | null;
    first_name: string
    last_name: string
    firstName?: string
    lastName?: string
    email: string
    phone_number: string | null
    currency: string | null
    avatar: string
    user_type: string
    email_notification?: string
    desktop_notification?: string
    email_verified_at?: string | null,
    notification?: string,
    user_identification?: string | number,
    loggin_company?: LoginCompanyResponse
    user_verified_at?: string | null,
    verification_token?: string,
    referral_code?: string,
    notification?: string,
    status?: string,
    created_at?: string
    updated_at?: string
    pivot?: UserPivotResponse
    permissions: Permissions[],
    roles: string[]
  }

  export interface Permissions {
    id: number | string,
    name: string
    ability: string
  }

  export interface LoginCompanyResponse {
    id: string | number,
    name: string
    avatar: string
    description: string
    hear_about_us: string
    location: string
    account_manager: string
    card_authorization: string | null,
    auto_renew: string | null
    created_at: string
    pivot: UserPivotResponse
  }


 export interface Tokens {
  token: string
  refreshToken: string | null
}


export interface RefreshPayload {
  token?: string
  accessToken?: string 
  refreshToken?: string | null
}

export type RefreshResponse = RefreshPayload | { data: RefreshPayload }



export interface UserRegistration {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string,
  token?: string
  code?: string
  userType?: string,  
  message?: string;
  status?: string | number
}