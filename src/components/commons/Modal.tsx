import React from 'react'
import { Modal as CustomModal } from "antd"

interface CustomModalProps {
    open: boolean
    onCancel?: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLElement>) => void;
    onClose?: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLElement>) => void;
    title?: React.ReactNode
    children: React.ReactNode
    width?: number | string
    closeIcon?: React.ReactNode | null
    className?: string
    height?: number | string
}

const Modal:React.FC<CustomModalProps> = (props) => {
  return (
    <CustomModal height={props.height} className={props.className} closeIcon={props.closeIcon || null} width={props.width} title={props.title} open={props.open} onCancel={props.onCancel ?? props.onClose} footer={null}>
          {props.children}
      </CustomModal>
  )
}

export default Modal
