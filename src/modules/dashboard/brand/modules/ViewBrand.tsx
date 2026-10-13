
import { Button, Input } from '@/components'
import { Icons } from '@/constants'
import { apiServices } from '@/services'
import { Avatar, Skeleton  } from 'antd'

const ViewBrand = ( { close, brandId } : { close: () => void, brandId: string | number } ) => {
    const { data: brandsById, isLoading: isBrandsByIdLoading } = apiServices.useBrandByIdQuery({id: brandId});


  return (
    <div className='p-5'>
        <span className='flex justify-end items-end text-24 text-gray font-medium font-outfit cursor-pointer' onClick={close}><Icons.CancelIcon /> </span>
        <form className='w-full mt-5 h-[30rem] overflow-y-scroll'>
            <p className='flex justify-between items-center'>
                <span className='text-24 text-black font-medium font-outfit'>{isBrandsByIdLoading ? <Skeleton.Button /> : brandsById?.data?.name}</span>
                <Button type="button" bg="bg-error">
                    Delete
                </Button>
            </p>
            <section className='block md:flex my-5 w-full gap-3'>
                <Input label='Industry' type="text" className='w-full' placeholder={brandsById?.data?.industry} disabled />
                <Input label='Website' type="text" className='w-full' placeholder={brandsById?.data?.website}  disabled  />
            </section>
            <Input label='Tell us about your brand' type="message" placeholder={brandsById?.data?.description} disabled  />
            <Input label='Target audience' type="message" padding="my-5" placeholder={brandsById?.data?.audience} disabled  />

            <div className="flex justify-start items-center gap-3 mb-5">
                {brandsById?.data?.colors?.map((color, index) => (
                      <Button key={index} type="button" bg={color}>
                      {color} <span>X</span>
                      </Button>
                ))}
            </div>

            <span className='text-20 text-black font-medium font-outfit'>Attachment</span>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-1'>
               {brandsById?.data?.brand_documents?.map((item, index) => (
                <div className='flex justify-start items-center gap-2 mb-2' key={index}>
                <Avatar size={40} shape='square' src={item?.image} /> 
                <span className='text-primary text-15 font-normal font-outfit'>{item?.name}</span> 
                <Icons.DownloadIcon size={20} className='cursor-pointer' />
           </div>
               ))}
            </div>
        </form>
    </div>
  )
}

export { ViewBrand }
