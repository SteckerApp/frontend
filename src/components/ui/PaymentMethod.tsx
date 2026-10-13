import { Images } from '@/constants'
import Button from './Button'

const PaymentMethod = () => {
  return (
    <div className="flex justify-start items-start flex-col bg-white px-5 lg:px-10 py-5 rounded-16 mt-10">
          <span className="text-25 font-medium font-outfit text-black">
            Payment Method
          </span>
          <span className="text-13 lg:text-14 text-gray font-normal font-outfit">
            Manage billing information and view receipts
          </span>

          <div className="block md:flex justify-between items-center w-full lg:w-[40rem] pt-5 pb-2">
            <div className="flex justify-start items-center gap-3 pb-2 lg:pb-0">
              <img
                src={Images.Visa}
                width={67}
                height={38}
                className="border border-gray p-2 rounded-md"
              />
              <span className="text-15 lg:text-16 text-black font-outfit font-medium">
                Visa ending in 2255
              </span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Button type="button" bg="bg-primary" className='text-16 w-full'>
                Update
              </Button>
              <Button type="button" bg="border border-error" color="text-error" className='text-16 w-full'>
                Remove
              </Button>
            </div>
          </div>
        </div>
  )
}

export default PaymentMethod
