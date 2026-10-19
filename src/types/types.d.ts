import { Permissions } from "./auth.types";

interface AuthLayoutProps {
    children: React.ReactNode;
    height?: string
    width?: string
}

interface MessageProps {
  sender: string;
  message: string;
  time: string;
  isRead: boolean;
  isReplied?: boolean;
  repliedMessage?: string;
}

interface MessageNotificationBox {
  day: string;
  message: MessageProps[];
}


interface InputProps {
    type?: "text" | "password" | "email" | "date" | "tel" | "message" | "otp" | "search" | "select" | undefined
    placeholder?: string
    value?: string
    name?: string
    label?: string
    padding?: string
    path?: To
    text?: string
    length?: number
    overflow?: string
    addonBefore?: ReactNode
    addonAfter?: ReactNode
    options?: DefaultOptionType[] | undefined
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    className?: string
    otpChange?: ((value: string) => void) | undefined
    disabled?: boolean
    textAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
    onError?: React.ReactEventHandler<HTMLInputElement> | undefined
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
    onOtpChange?: (value: string) => void;
}


interface PlanCardProps  {
    title: string;
    features: string[];
    price: string;
    oldPrice?: string;
    billing: string;
    buttonLabel: string;
    popular?: boolean;
    highlight?: string;
    mostPopular?: string;
    description?: string;
    subscription_id: string | number;
    isSelected?: boolean;
  };
  

//   drag and drop card project
interface Project {
    id: string;
    title: string;
  }
  
  interface DraggableProjectCardProps {
    project: Project;
  }




  // API INTEGRATIONS

  // login API declaration
  interface UserRoleType {
    userType?: "client" | "affiliate" | "admin";
  }
  interface UserProps {
    token: string;
    user: UserDataResponse,
    permissions: {
        id: number | string,
        name: string
        ability: string
    }[],
    roles: string[]
  }

  interface AuthState {
    token: UserProps | null;
    isLoading: boolean;
    error: string | null;
    message: string | null;
  }
  
  interface LoginCredentials {
    user_type: string;
    email: string;
    password: string;
  }

  interface UserDataResponse {
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

  interface LoginCompanyResponse {
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

  interface UserPivotResponse {
    user_id: string | number,
    company_id: string | number
  }

  interface UserProfileResponse {
    data: {
      user: UserDataResponse 
    }
  }



  // BRAND
  export interface BrandAPIResponse {
    data: BrandResponse
  }

export interface BrandResponse {
    current_page?: number | string,
    data: BrandDataResponse[]
    first_page_url?: string,
    from?: string | number,
    last_page?: string | number,
    last_page_url?: string,
    links?: BrandLinkResponse[]
    next_page_url?: string | null,
    path?: string,
    per_page?: number,
    prev_page_url?: string | null,
    to?: number,
    total?: number
}
  export interface BrandDataResponse {
    id: number | string,
    name?: string,
    colors?: string[],
    description?: string,
    website?: string,
    industry?: string,
    audience?: string,
    created_at?: string,
    deleted_at?: string | null,
    brand_documents?: BrandViewDoc[]
    attachments?: string[]
  }

  export interface BrandViewResponse {
    data: BrandDataResponse
  }
  interface BrandLinkResponse {
      url: string | null,
      label: string,
      active: boolean
  }

  interface BrandViewDoc {
    image: string
    name: string
  }

  interface DeleteBrand {
    id: string | number 
    response?: {
      message: string
    }
  }

  export interface CreateBrandResponse {
    name?: string,
    colors?: string | string[],
    description?: string,
    website?: string,
    industry?: string,
    audience?: string,
    attachments?: string[]
    message?: string
    status?: string
  }


  // WORKSPACE AND TEAMS
  interface WorkspaceDataResponse {
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
    users?: UserDataResponse[]
  }

  interface WorkspaceAPIResponse {
    data: WorkspaceDataResponse
    message?: string
  }



  // GET DASHBOARD HOME INTERFACE API RESPONSE 
  interface GetDashboardDimension {
    width: number;
    height: number;
  }
  
  interface GetDashboardProject {
    id: number;
    pm_id: string | null;
    designer_id: string | null;
    created_by: string;
    title: string;
    company_id: string;
    description: string;
    dimension: Dimension[];
    example_links: string[] | null;
    example_uploads: string[] | null;
    colors: string[];
    deliverables: string[] | null;
    date: string;
    status: string;
    created_at: string;
    deleted_at: string | null;
    file_uploads: number;
    pm: User | null;
    project_user: ProjectUser[];
  }
  
  interface GetDashboardUser {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
    user_verified_at: string | null;
    verification_token: string;
    user_type: string;
    referral_code: string;
    phone_number: string;
    currency: string | null;
    desktop_notification: string;
    email_notification: string;
    notification: string;
    status: string;
    created_at: string;
    updated_at: string | null;
  }
  
  interface GetDashboardProjectUser {
    id: number;
    avatar: string;
    pivot: {
      project_id: string;
      user_id: string;
    };
  }
  
  interface GetDashboardWorkspace {
    id: number;
    name: string;
    avatar: string | null;
    description: string;
    hear_about_us: string;
    location: string | null;
    account_manager: string;
    card_authorization: string | null;
    auto_renew: string;
    created_at: string;
    staffs: User[];
    staffs_strength: number;
    owner: string | null;
    pivot: {
      user_id: string;
      company_id: string;
    };
  }
  
  interface GetDashboardStatistics {
    todo: number;
    ongoing: number;
    completed: number;
  }
  
  interface GetDashboardPersonal {
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
    phone_number: string;
    company_role: string;
    workspace: GetDashboardWorkspace;
    other_workspace: GetDashboardWorkspace[];
  }
  
  interface GetDashboardResponseData {
    statistics: GetDashboardStatistics;
    personal: GetDashboardPersonal;
    projects: GetDashboardProject[];
  }
  
  interface GetDashboardApiResponse {
    message: string;
    data: GetDashboardResponseData;
  }


  // AUTH - REGISTER
  interface registerVerifyAPIResponse {
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

 interface  CompanyAPIResponse {
   name: string;
   phone_number: string;
   avatar: string;
   hear_about_us: string;
   description: string;
   message?: string;
   status?: string | number;
 }

 interface ChoosePlanAPIResponse {
  subscription_id: number | string;
  message?: string
  status?: string | number;
  data?: {
    reference: string
  }
 }