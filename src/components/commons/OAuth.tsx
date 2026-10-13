import React from "react";
import { Icons } from "@/constants";
import { Link } from "react-router-dom";

const OAuth: React.FC<InputProps> = (props) => {
  const loginAuth = [
    {
      img: Icons.GoogleIcon,
    },
    {
      img: Icons.FacebookIcon,
    },
    {
      img: Icons.AppleIcon,
    },
    {
      img: Icons.YahooIcon,
    },
    {
      img: Icons.MicrosoftIcon,
    },
  ];
  return (
    <>
      <div className="flex justify-center items-center gap-5 mt-5">
        <section className="w-48 h-[1px] bg-border" />
        <span className="text-12 font-outfit font-normal text-gray">Or</span>
        <section className="w-48 h-[1px] bg-border" />
      </div>

      <div className="block md:flex justify-center items-center text-center gap-10 my-5">
        <p className="text-16 font-normal font-outfit text-gray500 pb-2 sm:pb-0">
          Login using
        </p>
        <section className="flex justify-center items-center gap-3">
          {loginAuth?.map((item, index) => (
            <img src={item?.img} key={index} />
          ))}
        </section>
      </div>

      <p className="block md:flex justify-center items-center text-center gap-5 text-16 text-gray font-regular font-outfit">
        {props.label}{" "}
        <Link to={props.path} className="text-primary font-medium font-outfit">
          {props.text}
        </Link>
      </p>
    </>
  );
};

export default OAuth;
