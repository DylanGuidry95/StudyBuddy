function YearInput({ value, onChange, error }) {
    const handleChange = (e) => {
        const val = e.target.value;
        if (val.length > 4) return;
            onChange(val);
    };

    return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={handleChange}
      placeholder="Year"
      maxLength={4}
      style={{
        border: error ? "2px solid red" : undefined,
      }}
    />
  );
}

export default YearInput;
