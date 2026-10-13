
import { Images } from '@/constants'
import { Input } from '../ui'
import { Avatar, Button, Checkbox } from 'antd'

const AddCollaborator = () => {
  return (
    <div className='p-5'>
        <Input type='text' placeholder='Search member' padding="mb-5" />
        
        <div className='overflow-y-scroll h-[15rem]'>
          {Array.from({length: 10})?.map((_, index) => (
            <div className='flex justify-between items-center mb-3' key={index}>
            <section className='flex justify-start items-center gap-3'><Avatar size={40} src={Images.UserAvatar} /> <span className='text-18 text-black font-medium font-outfit'>Godwin Ahua</span></section>
            <Checkbox />
        </div>
          ))}
        </div>

        <Button type="primary" className='w-full mt-10'>Add Member</Button>
    </div>
  )
}

export default AddCollaborator
