export function FormSelect({ value, onChange, label, children, className }) {
  return (
    <div className={className}>
      <label className="font-medium">{label}</label>
      <select className="text-sm text-center" value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}
