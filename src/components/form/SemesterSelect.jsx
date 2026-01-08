function SemesterSelect({ value, onChange, error }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        border: error ? "2px solid red" : undefined,
      }}
    >
      <option value="Spring">Spring</option>
      <option value="Summer">Summer</option>
      <option value="Fall">Fall</option>
    </select>
  );
}

export default SemesterSelect;
