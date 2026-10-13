
import { Button, ErrorMessage, Input } from '@/components'
import { Icons } from '@/constants'
import { Schema } from '@/schema/Schema'
import { apiServices } from '@/services'
import { Checkbox, Button as SparkButton } from 'antd'
import { useFormik } from 'formik'
import { useState } from 'react'
import { ColorResult, SketchPicker } from 'react-color'
import { toast } from 'react-toastify'

const CreateBrand = ( { close } : { close: () => void} ) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [createBrand, {isLoading: isCreateBrandLoading}] = apiServices.useCreateBrandMutation();


    const handleColorChange = (color: ColorResult) => {
        const newColor = color.hex;
        if (!selectedColors.includes(newColor)) {
            const updatedColors = [...selectedColors, newColor];
            setSelectedColors(updatedColors);
            formik.setFieldValue("colors", updatedColors);
        }
    };
  
    const removeColor = (color: string) => {
        const updatedColors = selectedColors.filter((c) => c !== color);
        setSelectedColors(updatedColors);
        formik.setFieldValue("colors", updatedColors.join(","));
    };


    const formik = useFormik({
  initialValues: {
    name: '',
    industry: '',
    website: '',
    description: '',
    audience: '',
    colors: [] as string[],
    attachments: [] as File[],
  },
  validationSchema: Schema.createBrandSchema,
  onSubmit: async (values, { resetForm }) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'attachments') {
        if (Array.isArray(value)) value.forEach((file) => formData.append('attachments', file))
      } else if (key === 'colors') {
        if (Array.isArray(value)) value.forEach((color) => formData.append('colors[]', color))
      } else {
        formData.append(key, value as string | Blob)
      }
    })

    try {
      const res = await createBrand(formData).unwrap()
      toast.success(res?.message ?? 'Brand created successfully')
      resetForm()
      setUploadedFiles([])
    } catch (err) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ?? 'Could not create brand. Please try again.'
      toast.error(message)
    }
  },
})

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;
        if (files) {
          const validFiles = Array.from(files).filter(file => file?.size < 5 * 1024 * 1024);
          setUploadedFiles(validFiles);
          formik.setFieldValue("attachments", validFiles);
        }
      };

  return (
    <div className='p-1 md:p-5'>
        <span className='text-24 text-black font-medium font-outfit'>Create a Brand</span>
        <form onSubmit={formik.handleSubmit}>
        <div className='w-full mt-5 h-[30rem] overflow-y-scroll overflow-x-hidden'>
            <Input label='Your business name' type="text" placeholder='enter business name' name='name' value={formik.values.name} onChange={formik.handleChange} />
            <ErrorMessage touched={formik.touched.name} error={formik.errors.name} />
            <section className='block md:flex my-5 w-full gap-3'>
                <div>
                <Input placeholder='Enter name of industry' label='Industry' type="text" className='w-full' name='industry' value={formik.values.industry} onChange={formik.handleChange} />
                <ErrorMessage touched={formik.touched.industry} error={formik.errors.industry} />
                </div>
                <div>
                <Input placeholder='https://google.com' label='Website' type="text" className='w-full' name='website' value={formik.values.website} onChange={formik.handleChange}  />
                <ErrorMessage touched={formik.touched.website} error={formik.errors.website} />
                </div>
            </section>
            <Input label='Tell us about your brand' type="message" placeholder='description' name='description' value={formik.values.description} textAreaChange={formik.handleChange}  />
            <ErrorMessage touched={formik.touched.description} error={formik.errors.description} />
            <Input placeholder='enter audience' label='Target audience' type="message" padding="mt-5" name='audience' value={formik.values.audience} textAreaChange={formik.handleChange}  />
            <ErrorMessage touched={formik.touched.audience} error={formik.errors.audience} />

            <div className="flex justify-start items-center gap-3 mt-5">
                <Button
                    type="button"
                    bg="border border-dashed border-gray"
                    color="text-gray"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                >
                <img src={Icons.SelectColorIcon} /> Select colors
                </Button>
                <div className='flex gap-2 overflow-x-auto w-full'>

                {selectedColors.map((color, index) => (
                    <Button
                    key={index}
                    type="button"
                    bg={color}
                    color="text-black"
                    >
                    {color} <span className={`${color === "#ffffff" ? `text-black` : `text-white`} font-bold cursor-pointer`}  onClick={() => removeColor(color)}>X</span>
                    </Button>
                ))}
                    </div>
            </div>
            <ErrorMessage touched={formik.touched.colors} error={formik.errors.colors} />

            {showColorPicker && (
               <div className="relative">
                      <div
                 className="fixed inset-0 bg-transparent"
                 onClick={() => setShowColorPicker(false)}
               ></div>
          <div className="absolute z-10">
            <SketchPicker color="#fff" onChangeComplete={handleColorChange} />
          </div>
               </div>
        )}

            <p className='text-20 text-black font-medium font-outfit mt-5'>Attachment</p>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-1'>
                <Checkbox checked className='text-black font-normal font-outfit text-14'>Your Logo</Checkbox>
                <Checkbox checked className='text-black font-normal font-outfit text-14'>Any existing design</Checkbox>
                <Checkbox checked className='text-black font-normal font-outfit text-14'>Icons</Checkbox>
                <Checkbox checked className='text-black font-normal font-outfit text-14'>Product Images</Checkbox>
                <Checkbox checked className='text-black font-normal font-outfit text-14'>Fonts</Checkbox>
                <Checkbox checked className='text-black font-normal font-outfit text-14'>Brand manual/guidelines</Checkbox>
                <Checkbox checked className='text-black font-normal font-outfit text-14'>Patterns</Checkbox>
            </div>

            <div className="border-2 border-dashed border-gray p-8 rounded-lg text-center bg-primaryLight cursor-pointer mt-5">
                <input
                type="file"
                multiple
                className="hidden"
                id="fileInput"
                name="attachments"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                />
                <label htmlFor="fileInput" className="flex justify-center items-center flex-col cursor-pointer">
                    <img src={Icons.UploadIcon} />
                    <p className="text-black font-bold font-outfit text-20 mb-2">Drag & drop files or <span className="text-primary underline">Browse</span></p>
                    
                    {uploadedFiles.length > 0
                  ? `Uploaded ${uploadedFiles.length} file(s)` :
                    <p className="text-gray text-13 font-normal font-outfit">Supported formats: JPEG, PNG, GIF, PDF, PSD,</p> }
                </label>
            </div>
            <ErrorMessage touched={formik.touched.attachments} error={formik.errors.attachments} />
        </div>



        <div className='flex justify-center items-center gap-3 mt-8'>
            <SparkButton loading={isCreateBrandLoading} type='primary' className='w-full' htmlType='submit'>Save</SparkButton>
            <SparkButton onClick={close} type='default' className='w-full '>Cancel</SparkButton>
        </div>

        </form>
    </div>
  )
}

export { CreateBrand }
