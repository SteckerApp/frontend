import { Images } from '@/constants'
import { Avatar, Button } from 'antd'


const AddAccount = () => {
  return (
    <div className='flex justify-center items-center flex-col p-10'>
        <span className='text-20 text-black font-medium font-outfit mb-5'>Choose or Add another account</span>
        
        <div className='grid grid-cols-1 sm:grid-cols-1'>
        {Array.from({length: 2})?.map((_, index) => (
          <div className='flex justify-start items-center gap-5 border-b border-b-border pb-5 pt-5 last:border-none' key={index}>
          <Avatar size={60} shape='circle' src={Images.UserAvatar} />
          <article className='flex justify-start items-start flex-col'>
            <span className='text-20 text-black font-medium font-outfit'>Workspace {index + 1}</span>
            <span className='text-16 text-gray font-normal font-outfit'>dgreatwalex@gmail.com</span>
          </article>
        </div>
        ))}

        <Button type='primary' className='w-full mt-10'>Login with another account</Button>
        </div>
    </div>
  )
}

export default AddAccount
