import React from "react";
import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
      label,
      type = "text",
      className = "",
      ...props
    },ref) => {
        const id = useId();
        return (
        <div>
            {label && <label
            htmlFor={id}
            >{label}</label>}
            <input
            ref={ref}
            type={type}
            className={`px-4 py-2 ${className}`}
            {...props}
            id={id}
            />
        </div>
        );
  }
);

export default Input;