import React from 'react'


interface EmptyStateProps {
    img: string
    title: string
    description?: string
    action?: string
}

const EmptyState:React.FC<EmptyStateProps> = (props) => {
  return (
    <div className='flex justify-center items-center flex-col mt-20'>
        <img src={props.img} alt='Empty Brand' className='w-100 h-100' />
        <span className='text-center text-18 font-medium font-outfit text-blackHeader'>{props.title}</span>
        <p className='text-16 lg:text-20 text-gray font-normal font-outfit text-center'>Click on the <span className='text-primary font-medium'>{props.action}</span> button to create your {props.description}</p>
    </div>
  )
}

export default EmptyState
