
import React from "react";
const variants = {
	primary: "btn btn_base",
	secondary: "btn btn_secondary",
	third : "btn btn_third",
	success: "btn btn_success",
	outline: "btn btn_outline",
	danger: "btn btn_warning",
	close : "btn btn_close",
};

const sizes = {
	sm: "small",
	md: "medium",
	lg: "large",
};

export default function Button({
	variant = "primary",
	size = "md",
	isLoading = false,
	icon: Icon,
	children,
	className = "",
	...props
}) {
	return (
		<button
			className={`${variants[variant]} ${sizes[size]} ${className}`.trim()}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? <Icon type="user" className="rotate" size="2rem" /> : Icon && <Icon size={16} />}
			{children}
		</button>
	);
}
