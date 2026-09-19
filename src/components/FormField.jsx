export default function FormField({ label, type = 'text', name, value, onChange, placeholder, autoComplete }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </label>
  )
}
