import { Icons, paths } from "@/constants"
import { Button } from "antd"
import { Link } from "react-router-dom"


const success = () => {
  return (
    <div className='bg-bgAuthDesktop min-h-screen w-full flex justify-center items-center bg-center bg-cover bg-no-repeat p-5'>
        <section className="flex justify-center items-center flex-col w-full md:max-w-[28rem]">
            <img src={Icons.SuccessIcon} width={100} height={100} className="mb-4" />
            <span className='text-30 font-bold font-outfit text-black'>Successful!</span>
            <span className="text-17 text-center text-gray font-regular font-outfit">Welcome to the future of meaningful & sustainable work. We are so happy to have you onboard</span>

            <Link className="w-full" to={paths.login}><Button type="primary" className="w-full mt-5 text-18 font-medium font-outfit">Continue</Button></Link>
        </section>
    </div>
  )
}

export default success
