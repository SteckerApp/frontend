import { AuthLayout, Input } from "@/components";
import { Button } from "antd";
import { Icons, paths } from "@/constants";
import { Link } from "react-router-dom"

const Profile = () => {
  return (
    <AuthLayout height='h-auto lg:h-[55rem]' width="md:w-[586px]">
      <span className="text-25 md:text-30 text-center md:text-left font-medium font-outfit text-black">
      Complete Your Profile!
      </span>
      <p className="text-gray text-center md:text-left text-15 md:text-18 font-regular font-outfit pt-2 border-b border-border pb-8 mb-8">
      For the purpose of industry regulation, your details are required.
      </p>
      <Input type="tel" label="Phone Number" placeholder="+2348138885517" />
      <Input
        type="text"
        label="Company Name"
        placeholder="tryspark design"
        padding="my-5"
      />
      <Input type="text" label="How did you hear about us?" placeholder="Google Ads" />

      <Link to={paths.companyProfile}><Button type="primary" className="w-full mt-7">
        Save and Continue
      </Button></Link>

      <p className="flex justify-center items-center text-center gap-5 text-14 text-gray font-regular font-outfit pt-5">
        <img src={Icons.LockIcon} /> Your Info is safely secured
      </p>
    </AuthLayout>
  );
};

export default Profile;
