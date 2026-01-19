export function FormInput({
  value,
  onChange,
  type,
  label,
  className,
  maxLength,
  placeholder,
}) {
  return (
    <div className={className}>
      <label className="font-medium">{label}</label>
      <input
        className="text-sm text-center underline focus:outline-hidden"
        value={value}
        onChange={onChange}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
