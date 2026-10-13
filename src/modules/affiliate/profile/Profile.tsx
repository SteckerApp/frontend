import {  InnerWrapper, Input } from '@/components'
import { Icons, Images } from '@/constants'
import { Avatar, Button } from 'antd'


const Profile = () => { 
    const options = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        }
    ]
  return (
    <InnerWrapper>
            <div className='flex justify-center items-center'>
            <div className='block lg:flex justify-center bg-primaryLight p-5 lg:p-20 rounded-20 border border-white w-full lg:w-[70rem] gap-20 mt-5'>
                    <div className='flex justify-center items-center relative'>
                        <Avatar src={Images.UserAvatar} size={200} className="w-20 h-10 rounded-[50%]" />
                        {/* upload profile image icon */}
                        <div className='absolute top-20 right-20 bg-white p-2 rounded-md cursor-pointer'><Icons.EditIcon className='' /></div>
                    </div>
                <section className='w-full lg:w-[30rem]'>
                    <Input type="text" disabled placeholder='Godwin Ahua' />
                    <Input type="text" disabled placeholder='godwincahua@gmail.com' />
                    <Input type="text" disabled placeholder='+2348138885517' />
                    <Input type="select" disabled options={options} value='male' />
                    <Button type='primary' className='w-full lg:w-[8rem] mt-5'>Edit</Button>
                </section>
            </div>
            </div>
        </InnerWrapper>
  )
}

export default Profile
