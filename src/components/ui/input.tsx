import React from 'react'
import { Input as InputField, Select } from 'antd'
import { InputProps } from '@/types/types'

const Input:React.FC<InputProps> = (props) => {
  return (
    <div className='w-full'>
      {props.type === "text" || props.type === "email" || props.type === "date" || props.type === "tel" ? (
        <div className={`w-full ${props.padding}`}>
            <p className='text-gray500 text-16 font-normal font-outfit pb-2'>{props.label}</p>
            <InputField onBlur={props.onBlur} onError={props.onError} disabled={props.disabled} addonBefore={props.addonBefore} onChange={props.onChange} name={props.name} placeholder={props.placeholder} value={props.value} variant='borderless' className={props.className} />
        </div>
      ) : props.type === "otp" ? (
        <div className={`w-full ${props.padding}`}>
              <p className='text-gray500 text-16 font-regular font-outfit pb-2'>{props.label}</p>
             <InputField.OTP disabled={props.disabled} autoFocus className={`w-full ${props.overflow} ${props.className}`} onChange={props.otpChange} length={props.length} value={props.value ?? "0"} variant='borderless'  />
        </div>
      ) : props.type === "password" ? (
        <div className={`w-full ${props.padding}`}>
         <p className='text-gray500 text-16 font-regular font-outfit pb-2'>{props.label}</p>
        <InputField.Password onBlur={props.onBlur} disabled={props.disabled}  name={props.name} placeholder={props.placeholder} onChange={props.onChange} value={props.value} variant='borderless'  />
   </div>
      ): props.type === "select" ? (
        <div className={`w-full ${props.padding}`}>
         <p className='text-gray500 text-16 font-regular font-outfit pb-2'>{props.label}</p>
        <Select onBlur={props.onBlur} disabled={props.disabled} placeholder={props.placeholder} value={props.value} options={props.options} variant='borderless' className='w-full rounded-lg focus:border-primary'  />
   </div>
      ) : props.type === "message" ? (
        <div className={`w-full ${props.padding}`}>
        <p className='text-gray500 text-16 font-regular font-outfit pb-2'>{props.label}</p>
        <InputField.TextArea disabled={props.disabled} rows={5}  name={props.name} onChange={props.textAreaChange} placeholder={props.placeholder} value={props.value} variant='borderless' className={`h-[20rem] ${props.className}`} />
  </div>
      ) : null }
    </div>
  )
}

export default Input
