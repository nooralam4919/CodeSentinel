import React from "react";

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    function Input(
        {
            label,
            type = "text",
            className = "",
            id,
            ...props
        },
        ref
    ) {
        return (
            <>
                {label && (
                    <label
                        htmlFor={id}
                        className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    id={id}
                    type={type}
                    className={className}
                    {...props}
                />
            </>
        );
    }
);

export default Input;