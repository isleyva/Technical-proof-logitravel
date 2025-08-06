import React from "react";
import "./Button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "outline";
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  id,
  ariaLabel,
  className = "",
}) => {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-outline";
  const finalClassName = `${baseClass} ${className}`.trim();

  return (
    <button
      className={finalClassName}
      id={id}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);

