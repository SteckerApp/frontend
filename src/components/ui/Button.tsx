import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rel?: string;
  bg?: string;
  color?: string
  className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      rel={props.rel}
      style={{background: props.bg}}
      className={`flex justify-center items-center ${props.className} gap-2 font-medium font-outfit ${props.bg} px-4 py-2 ${props.color ?? `text-white`} rounded-lg text-nowrap`}
    >
      {props.children}
    </button>
  );
};

export default Button;
