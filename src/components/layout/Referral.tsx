import { Icons } from '@/constants'


const Referral = () => {
  return (
    <div className='absolute bottom-5'>   
        <div className="bg-sidebarLog p-5 mx-5 flex justify-center items-center flex-col bg-cover bg-center bg-no-repeat rounded-20">
          <img src={Icons.ReferralIcon} alt="Logo" />
          <span className="text-14 font-normal font-outfit text-white text-center py-3">
            Refer Spark to Friends & Family and get paid{" "}
            <span className="font-bold">N5,000</span> {""}
            everytime they use <span className="font-bold"> Spark</span>
          </span>
          <button className="bg-pending px-6 py-4 rounded-12 text-20 font-semibold font-outfit uppercase">
            Refer now
          </button>
        </div>
    </div>
  )
}

export { Referral }
