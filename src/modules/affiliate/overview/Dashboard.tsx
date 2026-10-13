import { AffiliateCard, Button, InnerWrapper } from '@/components'
import { Icons } from '@/constants'

const data = [
  {
    label: "Total users referred",
    value: 102,
    rate: 55,
    text: "than last week",
  },
  {
    label: "Net income",
    value: "$3,000",
    text: "Just Updated",
  },
  {
    label: "Income withdrew",
    value: "$3,000",
    text: "Just Updated",
  },
  {
    label: "Available for withdrawal",
    value: "$3,000",
    text: "Just Updated",
  }
]


const DashboardAffiliate = () => {
  return (
    <InnerWrapper>
              <div className='flex justify-between items-center mb-5'>
                <span className="text-24 text-black font-medium font-outfit">Referral Overview</span>
                <Icons.RefreshIcon size={30} className='text-black cursor-pointer' />
              </div>

              <div className='flex justify-start items-center gap-2 lg:gap-5 overflow-x-scroll  w-full'>
                  {data?.map((item, index) => (
                    <div className='w-[300px] lg:w-full'>
                         <AffiliateCard key={index} label={item?.label} value={item?.value} rate={item?.rate} text={item?.text}  />
                    </div>
                  ))}
              </div>

                <section className="bg-white rounded-20">
                    <div className='block lg:flex justify-center lg:justify-start items-center bg-primaryLight p-5 rounded-20 gap-5 mt-10 mb-5'>
                        <img src={Icons.ReferralCode} className='w-full lg:w-40' />
                        <div>
                            <section className='block lg:flex justify-center items-center gap-5 text-center lg:text-start space-y-3 lg:space-y-0'>
                              <span className='text-25 lg:text-40 text-primary font-medium font-outfit leading-normal'>Refer friends and families & earn</span>
                              <Button type="button" bg="bg-pending font-semibold w-full lg:w-20" color="text-black">N5,000</Button>
                            </section>
                            <p className='text-15 lg:text-18 font-normal font-outfit text-black pt-2 lg:pt-0'>Refer Spark to <span className='font-semibold'>friends and families & earn N5,000</span> every time they use our services</p>
                        </div>
                    </div>

                    <div className='my-5 p-5 lg:p-10'>
                        <span className='text-20 font-normal font-outfit text-black'>Share your referral link with your friends and families</span>
                        <div className='block lg:flex justify-between items-center mt-5 space-y-2 lg:space-y-0'>
                            <section className='flex justify-between items-center rounded-20 border-2 border-primary pl-3 w-full lg:w-[50rem]'>
                              <p className='text-15 text-black font-normal font-outfit'>Referral code: <span className='font-semibold'>JAMESBOND1223</span></p>
                              <span className='bg-primary text-nowrap text-white p-3 rounded-tr-16 rounded-br-16 cursor-pointer'>Copy Link</span>
                            </section>

                            <section className='flex justify-center items-center gap-3'>
                              <span className='cursor-pointer flex justify-center items-center w-10 h-10 rounded-full border-2 border-black'><Icons.Facebook size={25} /></span>
                              <span className='cursor-pointer flex justify-center items-center w-10 h-10 rounded-full border-2 border-black'><Icons.Instagram size={25} /></span>
                              <span className='cursor-pointer flex justify-center items-center w-10 h-10 rounded-full border-2 border-black'><Icons.Twitter size={25} /></span>
                              <span className='cursor-pointer flex justify-center items-center w-10 h-10 rounded-full border-2 border-black'><Icons.WhatsAppIcon size={25} /></span>
                            </section>
                        </div>
                    </div>
                </section>

                <span className='flex justify-center items-center text-black text-12 font-normal font-outfit mt-10 lg:mt-20'>Please note that some Terms and Conditions apply. Your friends will need to verify their identity and also use any of our services before any cash rewards are paid to your account.</span>
            </InnerWrapper>
  )
}

export default DashboardAffiliate
