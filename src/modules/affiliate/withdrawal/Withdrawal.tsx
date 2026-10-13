import { Button, CustomTab, DashboardLayout, InnerWrapper } from '@/components'
import { Images } from '@/constants'
import { ReferralTable } from './ReferalTable';
import { PayoutTable } from './PayoutTable';


const Withdrawal = () => {
    const contentMap = {
        "Referral history": <ReferralTable />,
        "Payout history": <PayoutTable />,

      };
    
      const options = ["Referral history", "Payout history"]

  return (
    <DashboardLayout isAffiliate>
        <InnerWrapper>
               <div className='bg-white rounded-20 p-5 lg:p-10 mt-5'>
                    <span className='text-25 text-black font-medium font-outfit'>Bank Account</span>
                    <p className='text-gray text-14 font-regular font-outfit'>Your referral earnings will be credited into this account</p>

                    <section className='block lg:flex justify-start items-center gap-4 mt-5 space-y-3 lg:space-y-0'>
                        <div className='flex justify-start items-center gap-2'>
                          <div className='flex justify-center items-center border border-gray rounded-10 w-[87px] h-[57px] px-2'><img className='rounded-md' width="100%" height="100%" src={Images.UBALogo} /> </div>
                          <span className='text-black text-16 font-medium font-outfit'>2066890782   |   Amusat Olawale</span>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                          <Button type='button' bg="bg-primary" color='text-white'>Update account info</Button>
                          <Button type='button' bg="bg-card border border-error" color='text-error'>Remove</Button>
                        </div>
                    </section>

               </div>

               <div className='bg-white rounded-20 p-5 lg:p-10 mt-5'>
                    <CustomTab options={options} contentMap={contentMap} isButton width='w-[10.5rem]' buttonText='Request Payout' buttonTextSmall="+" />
               </div>
        </InnerWrapper>
    </DashboardLayout>
  )
}

export default Withdrawal
