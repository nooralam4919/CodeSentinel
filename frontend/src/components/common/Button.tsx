import React from "react";

// 1. <input> is a void element

// An <input> cannot have children

{/* <input>
  Sign In                 // ❌ Wrong:
</input> */}


{/* <input type="text" />          ✅ Correct: */}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", children, type = "button", ...props }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={className}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
