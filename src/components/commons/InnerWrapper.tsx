import React from 'react'

const InnerWrapper = ({ children } : { children: React.ReactNode}) => {
  return (
    <div className="flex justify-center items-center flex-col">
        <div className="w-full lg:w-[85rem]">
                {children}
        </div>
    </div>
  )
}

export default InnerWrapper
