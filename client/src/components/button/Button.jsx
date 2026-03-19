import "./button.css";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "",
  className = "",
  disabled = false,
}) {
  // Combinamos una clase base 'btn', la variante 'btn--primary' y cualquier clase extra
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
