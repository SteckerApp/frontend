
import { Button, Input } from "@/components";
import { Icons, paths } from "@/constants";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface Dimension {
  link: string;
}

const AboutTheTask = () => {
  const [dimensions, setDimensions] = useState<Dimension[]>([{ link: "" }]);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedDeliverable, setSelectedDeliverable] = useState<number[]>([]);

  const handleSelectBrand = (index: number) => {
    setSelectedBrand(index);
  };

  const handleSelectDeliverable = (index: number) => {
    setSelectedDeliverable((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleAddDimension = () => {
    setDimensions((prev) => [...prev, { link: "" }]);
  };

  const handleRemoveDimension = (index: number) => {
    setDimensions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDimensionChange = (
    index: number,
    key: "link",
    value: string
  ) => {
    setDimensions((prev) =>
      prev.map((dim, i) =>
        i === index ? { ...dim, [key]: value } : dim
      )
    );
  };

  return (
    <div className="py-5 h-full lg:h-[40rem] overflow-y-auto w-full">
      <p className="text-black text-16 font-normal font-outfit pt-5 pb-2">
        Select Brand <span className="text-error">*</span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <section
            key={index}
            onClick={() => handleSelectBrand(index)}
            className={`flex justify-center border items-center gap-3 p-5 rounded-md cursor-pointer ${
              selectedBrand === index
                ? "border-primary bg-primaryLight"
                : "border-gray"
            }`}
          >
            <Icons.FolderIcon
              size={30}
              color={
                selectedBrand === index
                  ? "var(--colorPrimary)"
                  : "var(--colorGray)"
              }
            />

            <span
              className={`text-black text-14 ${
                selectedBrand === index ? "font-semibold" : "font-normal"
              } font-outfit`}
            >
              Brand
            </span>
          </section>
        ))}

        <Link
          to={paths.dashboardBrand}
          className="flex justify-center border border-gray items-center gap-3 p-5 rounded-md cursor-pointer bg-primary lg:bg-transparent"
        >
          <span className="flex justify-center text-nowrap items-center gap-3 text-16 text-white lg:text-primary font-medium font-outfit">
            <Icons.FolderIcon size={30} />
            New Brand
          </span>
        </Link>
      </div>

      <p className="text-black text-16 font-normal font-outfit pt-5 pb-2">
        Colors to Incorporate (optional){" "}
        <span className="text-error">*</span>
      </p>

      <div className="flex justify-start items-center gap-3">
        <Button
          type="button"
          bg="border border-dashed border-gray"
          color="text-gray"
        >
          <img src={Icons.SelectColorIcon} alt="Select colors" />
          Select colors
        </Button>

        <div className="flex justify-start items-center overflow-x-auto gap-2">
          <Button type="button" bg="bg-error">
            FF0505 <span>X</span>
          </Button>

          <Button
            type="button"
            bg="bg-pending"
            color="text-black"
          >
            FFE600 <span>X</span>
          </Button>
        </div>
      </div>

      <p className="text-black text-16 font-normal font-outfit pt-5">
        Examples or Reference links (Optional){" "}
        <span className="text-error">*</span>
      </p>

      <div className="flex flex-col w-full">
        {dimensions.map((dim, index) => (
          <div
            className="flex justify-start items-center gap-3 w-full"
            key={index}
          >
            <Input
              type="text"
              placeholder="https://tryspark.com"
              className="w-full"
              value={dim.link}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDimensionChange(index, "link", e.target.value)
              }
            />

            <section>
              {dimensions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDimension(index)}
                  aria-label={`Remove reference link ${index + 1}`}
                  className="flex justify-center items-center text-white text-20 font-medium font-outfit bg-primary w-8 h-8 rounded-full"
                >
                  &minus;
                </button>
              )}
            </section>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddDimension}
          className="flex justify-start items-center gap-2 mt-4 cursor-pointer"
        >
          <span className="flex justify-center items-center text-white text-20 font-medium font-outfit bg-primary w-5 h-5 rounded-full">
            &#43;
          </span>
          <span>Add another link</span>
        </button>
      </div>

      <p className="text-black text-16 font-normal font-outfit pt-5 pb-2">
        Deliverables <span className="text-error">*</span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <section
            key={index}
            onClick={() => handleSelectDeliverable(index)}
            role="checkbox"
            aria-checked={selectedDeliverable.includes(index)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelectDeliverable(index);
              }
            }}
            className={`flex justify-center items-center flex-col rounded-20 border h-[200px] p-5 cursor-pointer ${
              selectedDeliverable.includes(index)
                ? "border-primary bg-primaryLight"
                : "border-gray"
            }`}
          >
            <img src={Icons.PDFImg} alt="PDF file" width={50} height={50} />

            <span className="text-25 text-black font-medium font-outfit">
              PDF
            </span>

            <span className="text-gray text-14 font-normal font-outfit">
              Acrobat reader
            </span>
          </section>
        ))}
      </div>
    </div>
  );
};

export { AboutTheTask };
