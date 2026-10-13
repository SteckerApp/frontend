import React from 'react'
import { Button } from '../ui'
import { paths } from '@/constants'

interface SwitchModalProps {
    target: string | null
    confirm: () => void,
    cancel: () => void,
}

const SwitchModal: React.FC<SwitchModalProps> = (props) => {
  return (
    <div className="p-5 w-full">
    <span className="flex justify-center items-center text-20 text-black font-outfit font-semibold">{
    props.target === paths.affiliateDashboard
      ? "Switch to Affiliate"
      : "Switch to Client"
  }</span>
  <p className=" mt-3">
    {props.target === paths.affiliateDashboard
      ? "Are you sure you want to switch to the Affiliate Dashboard?"
      : "Are you sure you want to switch to the Client Dashboard?"}
  </p>
  <div className="flex justify-center items-center gap-3 mt-5 w-full">
    <Button type="button" bg='bg-primary w-full' color="text-white" onClick={props.confirm} >Yes Switch</Button>
    <Button onClick={props.cancel} type="button" bg="bg-white border-[1.5px] border-primary w-full" color="text-primary">
      Cancel
    </Button>
  </div>
  </div>
  )
}

export default SwitchModal
