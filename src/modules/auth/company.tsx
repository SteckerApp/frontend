import { AuthLayout, Input } from "@/components";
import { Avatar, Button } from "antd";
import { Icons, paths } from "@/constants";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useRef, useState } from "react";
import { useFormik } from "formik";
import { Schema } from "@/schema/Schema";
import { apiServices } from "@/services";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/ultis";

const Company = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [companyAction, { isLoading: isCompanyLoading }] =
    apiServices.useCompanyMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      avatar: null as File | null,
      description: "",
      hear_about_us: "",
      phone_number: "",
    },
    validationSchema: Schema.companySchema,
    onSubmit: async (values) => {
      const name = values.name.trim();
      const phoneNumber = values.phone_number.trim();

      if (!name || !phoneNumber) {
        toast.error("Company name and phone number are required");
        return;
      }
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("description", values.description);
      formData.append("hear_about_us", values.hear_about_us);
      formData.append("phone_number", values.phone_number.trim());

      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      try {
        const res = await companyAction({ formData }).unwrap();
        toast.success(res?.message ?? "Company profile saved");
        navigate(paths.choosePlan);
      } catch (err) {
        toast.error(getErrorMessage(err, "Could not save company profile"));
      }
    },
  });

  // function to handle button click and trigger file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  // function to handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreviewLogo(fileURL);
      formik.setFieldValue("avatar", file);
    }
  };

  return (
    <AuthLayout height="h-auto lg:h-[50rem]" width="md:w-[950px]">
      <p className="text-25 md:text-30 font-medium font-outfit text-black text-center leading-normal">
        Complete your company profile!
      </p>
      <p className="text-gray text-15 md:text-18 font-regular font-outfit pt-2 border-b border-border pb-8 mb-8 text-center">
        Let us get to know about your business
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          <section className="w-full">
            <div className="mb-5">
              <Input
                type="text"
                label="Company Name"
                placeholder="enter your company name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs pt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <p className="text-gray500 text-16 font-regular font-outfit pb-2">
              Company Logo
            </p>

            <div className="flex justify-start items-center gap-8">
              <div className="w-[100px] h-[100px]">
                <Avatar
                  size={100}
                  className="border border-primary"
                  src={
                    previewLogo ||
                    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnM.png"
                  }
                />
              </div>
              <section>
                <Button
                  type="primary"
                  className="w-full mt-7"
                  onClick={handleUploadClick}
                >
                  Upload Logo
                </Button>
                <span className="text-12 text-gray font-outfit font-regular">
                  Jpg, png & gif are allowed
                </span>
                {formik.touched.avatar && formik.errors.avatar && (
                  <p className="text-red-500 text-xs">{formik.errors.avatar}</p>
                )}
              </section>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/gif"
              onChange={handleFileChange}
            />
          </section>

          <section className="w-full">
            <div>
              <Input
                type="text"
                label="Location"
                placeholder="enter your location e.g Abuja Nigeria"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-xs pt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>
            <div className="my-5">
              <Input
                type="text"
                label="How did you hear about us?"
                placeholder="Google Ads"
                name="hear_about_us"
                value={formik.values.hear_about_us}
                onChange={formik.handleChange}
              />
              {formik.touched.hear_about_us && formik.errors.hear_about_us && (
                <p className="text-red-500 text-xs pt-1">
                  {formik.errors.hear_about_us}
                </p>
              )}
            </div>
            <div>
              <Input
                type="tel"
                label="Best number to reach you  (For customer support)"
                placeholder="enter your phone number"
                name="phone_number"
                value={formik.values.phone_number}
                onChange={formik.handleChange}
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <p className="text-red-500 text-xs pt-1">
                  {formik.errors.phone_number}
                </p>
              )}
            </div>

            <Button
              type="primary"
              className="w-full mt-7"
              htmlType="submit"
              loading={isCompanyLoading}
            >
              Save and Continue
            </Button>
          </section>
        </div>
      </form>

      <p className="flex justify-center items-center text-center gap-5 text-14 text-gray font-regular font-outfit pt-5">
        <img src={Icons.LockIcon} /> Your Info is safely secured
      </p>
    </AuthLayout>
  );
};

export default Company;
