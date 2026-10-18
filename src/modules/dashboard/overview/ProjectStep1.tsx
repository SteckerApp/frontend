
import { Button, InnerWrapper } from '@/components'
import { CreateProject } from './modules/CreateProject'
import { AboutTheTask } from './modules/AboutTheTask';
import { FileUpload } from './modules/FileUpload';
import { useState } from 'react';


const Project = () => {
    const [currentStep, setCurrentStep] = useState(0);


  const handleNext = () => {
    if (currentStep < createProjectSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

    const createProjectSteps = [
        {
          title: "Create new project",
          description: "Tell us what you need designed & how you want it.",
          content: <CreateProject />,
        },
    
        {
          title: "Tell us more about this task",
          description: "Choose your preferred brand, colors and deliverables ",
          content: <AboutTheTask />,
        },
    
        {
          title: "Upload attachments (optional)",
          description: "Upload any file or media that your designer will need to complete the project here.",
          content: <FileUpload />,
        },
      ];

      
  return (
    <>
        <InnerWrapper>
            <div className='px-0 lg:px-40'>
            <span className="text-primary text-22 lg:text-35 font-semibold font-outfit">
            {createProjectSteps[currentStep].title}
          </span>
          <p className="text-gray text-15 lg:text-18 font-normal font-outfit">
            {createProjectSteps[currentStep].description}
          </p>
           
          {createProjectSteps[currentStep].content}

            
          <div className="flex justify-end items-end gap-2 mt-5">
           
            {currentStep === 0 ? null : <Button
              type="button"
              bg="border border-primary w-full md:w-[7rem]"
              color="text-primary"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button> }
            {currentStep === createProjectSteps.length - 1 ? (
                <Button type="button" bg="bg-primary w-full md:w-[7rem]" >
                    Submit
                </Button>
                ) : (
                <Button type="button" bg="bg-primary w-full md:w-[7rem]" onClick={handleNext}>
                    Next
                </Button>
            )}
          </div>
            </div>
        </InnerWrapper>
    </>
  )
}

export default Project
