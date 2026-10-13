import { Input } from '@/components'
import { Button } from 'antd'

const AddTeam = ({ close } : { close: () => void }) => {
    const options = [
        {
            label: 'Collaborator',
            value: 'collaborator',
        },
        {
            label: 'Administrator',
            value: 'admin',
        }
    ]

  return (
    <div className='p-2 md:p-10 w-full'>
        <span className='text-24 text-black font-medium font-outfit'>Add people to your team</span>
        <p className='text-14 text-gray font-normal font-outfit'>Invite additional team members to create an account and make requests</p>

            <Input type='text' label='Name' placeholder='enter team member name ' padding="my-5"/>
            <Input type='email' label='Email' placeholder='enter team member email address' padding="mb-5" />
            <Input type='select' label='Role' options={options} placeholder='Collaborator' />

        <div className='flex justify-center items-center gap-3 mt-8'>
        <Button type='primary' className='w-full'>Send Invite</Button>
        <Button type='default' className='w-full' onClick={close}>Cancel</Button>
        </div>
    </div>
  )
}

export {AddTeam}
