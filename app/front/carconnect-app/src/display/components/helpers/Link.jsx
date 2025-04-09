import React from "react";

const variants = {
  primary: "text text_primary",
  secondary: "text text_secondary",
  third: "text text_third",
  success: "text text_success",
  outline: "text text_outline",
  danger: "text text_warning",
  link: "text text_link",
};

const sizes = {
  sm: "small",
  md: "medium",
  lg: "large",
};

export default function Text({
  variant = "primary",
  size = "md",
  icon: Icon,
  children,
  className = "",
  onClick,
  ...props
}) {
  return (
    <p
      className={`${variants[variant]} ${sizes[size]} ${className} ${onClick ? 'clickable' : ''}`.trim()}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={16} className="text-icon" />}
      {children}
    </p>
  );
}