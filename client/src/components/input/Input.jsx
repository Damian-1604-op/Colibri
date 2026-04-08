import React from "react";
import "./inputStyle.css";
export default function Input({
  type = "text",
  name,
  value,
  ph,
  variant,
  disabled = false,
  required = false,
  ...props
}) {
  const fullClassName = `input`;
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={ph}
      className={fullClassName}
      disabled={disabled}
      required={required}
      {...props}
    />
  );
}
