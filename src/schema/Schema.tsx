import * as yup from "yup"

export const LoginSchema = yup.object({
    email: yup.string()
      .email('Invalid email address')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email address'
      )
      .required('Email is Required'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is Required')
  });


  export const ForgotPasswordSchema = yup.object({
    // user_type: yup.string().required("User Type is required"),
    email: yup.string()
    .email('Invalid email address')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email address'
    )
    .required('Email is Required'),
  })

  export const OTPProvidedSchema = yup.object({
    otp_provided: yup.string().required("OTP is required"),
    email: yup.string()
    .email('Invalid email address')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email address'
    )
    .required('Email is Required'),
  })


  export const ChangePasswordSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      )
      .required("Email is required"),
  
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords does not match")
      .required("Password confirmation is required"),
  
    token: yup.string().required("Verification token is required"),
  });
  



const AddUserSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email_personal: yup.string().email("Invalid email"),
  staff_official_email: yup.string().email("Invalid email"),
  job_title: yup.string().required("Job title is required"),
  address: yup.string().required("Address is required"),
  staff_department: yup.string().required("Department is required"),
  nationality: yup.string().required("Nationality is required"),
  city: yup.string().required("City is required"),
  phone: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  alloted_staff_permissions: yup.array().of(yup.string().required("At least one permission is required")),
  job_description: yup.string().required("Job description is required"),
  employment_status: yup.string().required("Employment status is required"),
});


const CreateJobSchema = yup.object().shape({
  name: yup.string().required("Job Name is required"),
  description: yup.string().required("Job Description is required"),
  short_name: yup.string().required("Short Name is required"),
});


const CreateDepartmentSchema = yup.object().shape({
  name: yup.string().required("Department Name is required"),
  description: yup.string().required("Department Description is required"),
  short_name: yup.string().required("Department Short Name is required"),
});


const UpdateStaffPermissionSchema = yup.object().shape({
  user_id: yup.string().required("First name is required"),
  permissions: yup.array().of(yup.string().required("At least one permission is required")),
});


const CreateBenchmarkSchema = yup.object().shape({
  vendor_benchmark_name: yup.string().required('Vendor benchmark name is required'),
  phone_number: yup
    .number()
    .typeError('Phone number must be a valid number')
    .positive('Phone number must be a positive number')
    .integer('Phone number must be an integer')
    .required('Phone number is required'),
  date_of_birth: yup
    .number()
    .typeError('Date of birth must be a number')
    .positive('Date of birth must be a positive number')
    .required('Date of birth is required'),
  address: yup
    .number()
    .typeError('Address must be a number')
    .positive('Address must be a positive number')
    .integer('Address must be an integer')
    .required('Address is required'),
  locale: yup
    .number()
    .typeError('Locale must be a number')
    .positive('Locale must be a positive number')
    .integer('Locale must be an integer')
    .required('Locale is required'),
  business_type_kind_nin_cac_tin: yup
    .number()
    .typeError('Business type/NIN/CAC/TIN must be a number')
    .positive('Business type/NIN/CAC/TIN must be a positive number')
    .integer('Business type/NIN/CAC/TIN must be an integer')
    .required('Business type/NIN/CAC/TIN is required'),
  business_name: yup
    .number()
    .typeError('Business name must be a number')
    .positive('Business name must be a positive number')
    .integer('Business name must be an integer')
    .required('Business name is required'),
  vendor_lga: yup
    .number()
    .typeError('Vendor LGA must be a number')
    .positive('Vendor LGA must be a positive number')
    .integer('Vendor LGA must be an integer')
    .required('Vendor LGA is required'),
  vendor_city: yup
    .number()
    .typeError('Vendor city must be a number')
    .positive('Vendor city must be a positive number')
    .integer('Vendor city must be an integer')
    .required('Vendor city is required'),
  vendor_state: yup
    .number()
    .typeError('Vendor state must be a number')
    .positive('Vendor state must be a positive number')
    .integer('Vendor state must be an integer')
    .required('Vendor state is required'),
  applying_as: yup
    .number()
    .typeError('Applying as must be a number')
    .positive('Applying as must be a positive number')
    .integer('Applying as must be an integer')
    .required('Applying as is required'),
  specialty: yup
    .number()
    .typeError('Specialty must be a number')
    .positive('Specialty must be a positive number')
    .integer('Specialty must be an integer')
    .required('Specialty is required'),
  business_work_place: yup
    .number()
    .typeError('Business work place must be a number')
    .positive('Business work place must be a positive number')
    .integer('Business work place must be an integer')
    .required('Business work place is required'),
  business_age: yup
    .number()
    .positive('Business age must be positive')
    .required('Business age is required'),
  own_a_bank_account: yup
    .number()
    .typeError('Bank account ownership status must be a number')
    .positive('Bank account ownership status must be a positive number')
    .integer('Bank account ownership status must be an integer')
    .required('Bank account ownership status is required'),
  own_a_social_media_account_instagram_facebook_whatsapp_twitter: yup
    .number()
    .typeError('Social media account ownership status must be a number')
    .positive('Social media account ownership status must be a positive number')
    .integer('Social media account ownership status must be an integer')
    .required('Social media account ownership status is required'),
  business_work_location_state: yup
    .number()
    .typeError('Business work location state must be a number')
    .positive('Business work location state must be a positive number')
    .integer('Business work location state must be an integer')
    .required('Business work location state is required'),
  business_proofs_of_work: yup
    .number()
    .typeError('Proof of work must be a number')
    .positive('Proof of work must be a positive number')
    .integer('Proof of work must be an integer')
    .required('Proof of work is required'),
  approved_score: yup
    .number()
    .min(0, 'Approved score must be at least 0')
    .max(100, 'Approved score cannot exceed 100')
    .required('Approved score is required'),
  is_benchmark_active: yup
    .boolean()
    .required('Benchmark active status is required'),
  created_by: yup.string().required('Creator name is required'),
  first_name: yup
    .number()
    .typeError('First name must be a number')
    .positive('First name must be a positive number')
    .integer('First name must be an integer')
    .required('First name is required'),
  last_name: yup
    .number()
    .typeError('Last name must be a number')
    .positive('Last name must be a positive number')
    .integer('Last name must be an integer')
    .required('Last name is required'),
  email: yup
    .number()
    .typeError('Email must be a number')
    .positive('Email must be a positive number')
    .integer('Email must be an integer')
    .required('Email is required'),
  gender: yup
    .number()
    .typeError('Gender must be a number')
    .positive('Gender must be a positive number')
    .integer('Gender must be an integer')
    .required('Gender is required'),
});


const vendorScoreSchema = yup.object().shape({
  address: yup.boolean(),
  applying_as: yup.boolean(),
  business_age: yup.boolean(),
  business_cac: yup.boolean(),
  business_email: yup.boolean(),
  business_name: yup.boolean(),
  business_nin: yup.boolean(),
  business_proofs_of_work: yup.boolean(),
  business_tin: yup.boolean(),
  business_type_kind: yup.boolean(),
  business_work_location_state: yup.boolean(),
  business_work_place: yup.boolean(),
  date_of_birth: yup.boolean(),
  facebook: yup.boolean(),
  gender: yup.boolean(),
  instagram: yup.boolean(),
  own_a_bank_account: yup.boolean(),
  own_a_social_media_account: yup.boolean(),
  phone_number: yup.boolean(),
  specialty: yup.boolean(),
  twitter: yup.boolean(),
  vendor_city: yup.boolean(),
  vendor_lga: yup.boolean(),
  vendor_state: yup.boolean(),
  whatsapp: yup.boolean(),
  zip_code: yup.boolean(),
});


export const createBrandSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  description: yup.string().required('Description is required'),
  website: yup.string().required('Website is required'),
  industry: yup.string().required('Industry is required'),
  audience: yup.string().required('Audience is required'),
  colors: yup.array().of(yup.string()).required('At least one color is required'),
  attachments: yup.array().required("Attachments is required")
    .min(1, "At least one attachments is required")
    .of(yup.mixed().required("Each attachments must be a file")),
});


export const companySchema = yup.object().shape({
  name: yup.string().required("Company Name is required"),
  avatar: yup.mixed().required("Company logo is required"),
  hear_about_us: yup.string().required("This field is required"),
  phone_number: yup.string().required("Phone number is required"),
  description: yup.string().required("Location is required"),
});



  export const Schema = {
    LoginSchema,
    ForgotPasswordSchema,
    AddUserSchema,
    CreateJobSchema,
    CreateDepartmentSchema,
    OTPProvidedSchema,
    ChangePasswordSchema,
    UpdateStaffPermissionSchema,
    CreateBenchmarkSchema,
    vendorScoreSchema,
    createBrandSchema,
    companySchema
  }
