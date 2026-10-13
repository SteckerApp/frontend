import React from 'react'

interface LabelProps {
    label: string
}

const Label:React.FC<LabelProps> = (props) => {
  return (
    <span className='text-22 font-medium font-outfit text-black'>{props.label}</span>
  )
}

export default Label
