import "./button.css";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "",
  className = "",
  disabled = false,
}) {
  const fullClassName = `btn btn--${variant}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={fullClassName.trim()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
