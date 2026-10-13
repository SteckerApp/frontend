import { Button, Input } from "@/components";
import { Icons } from "@/constants";
import { ChangeEvent, useState } from "react";

interface Dimension {
  width: string;
  height: string;
}

const CreateProject = () => {
  const [dimensions, setDimensions] = useState<Dimension[]>([
    { width: "", height: "" },
  ]);

  const handleAddDimension = () => {
    setDimensions([...dimensions, { width: "", height: "" }]);
  };

  const handleRemoveDimension = (index: number) => {
    const updatedDimensions = dimensions.filter((_, i) => i !== index);
    setDimensions(updatedDimensions);
  };

  const handleDimensionChange = (
    index: number,
    key: "width" | "height",
    value: string
  ) => {
    const updatedDimensions = dimensions.map((dim, i) =>
      i === index ? { ...dim, [key]: value } : dim
    );
    setDimensions(updatedDimensions);
  };

  return (
    <div className="py-5 mt-5 h-full lg:h-[40rem] overflow-y-auto w-full">
      <Input
        type="text"
        placeholder="Enter preferred project title "
        label="Project Title"
      />

        <Input
        type="message"
        placeholder="Enter project description"
        label="Project Description"
        padding="mt-5"
      />

      <p className="text-gray500 text-16 font-normal font-outfit pt-5">
        Custom Dimension <span className="text-error">*</span>
      </p>
      {dimensions?.map((dim, index) => (
        <div className="flex justify-center items-center w-full" key={index}>
          <Input
            type="text"
            placeholder="width"
            className="w-full"
            value={dim.width}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleDimensionChange(index, "width", e.target.value)
            }
          />
          <span className="mx-3">X</span>
          <Input
            type="text"
            value={dim.height}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleDimensionChange(index, "height", e.target.value)
            }
            placeholder="height"
            className="w-full"
          />
            <section>
            {dimensions.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveDimension(index)}
              className="flex ml-2 justify-center items-center text-white text-20 font-medium font-outfit bg-primary w-8 h-8 rounded-full"
            >
              &minus;
            </button>
          )}
            </section>
        </div>
      ))}

<div className="flex justify-start items-center gap-2 mt-4" onClick={handleAddDimension}>
              <button
                type="button"
                className="flex justify-center items-center text-white text-20 font-medium font-outfit bg-primary w-5 h-5 rounded-full"
              >
                &#43;
              </button>
             <span className="cursor-pointer"> Add another link</span>
            </div>

      <Button type="button" bg="bg-primary border border-primary w-full py-4 mt-5 hover:bg-pending hover:text-black hover:border-pending gap-10">Choose from already made presets <Icons.ChevronDownIcon /></Button>
    </div>
  );
};

export { CreateProject };
