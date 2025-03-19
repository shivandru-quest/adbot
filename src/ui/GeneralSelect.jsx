import React from "react";
import Select from "react-select";
const GeneralSelect = ({
  options,
  value,
  onChange,
  isMulti = false,
  Placeholder = "select a value...",
  selectHeight = "2.25rem",
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti={isMulti}
      placeholder={Placeholder}
      styles={{
        control: (provided) => ({
          ...provided,
          borderColor: "#ccc",
          borderRadius: "6px",
          padding: "0px 2px",
          outline: "none",
          height: selectHeight,
          minHeight: selectHeight,
          display: "flex",
          alignItems: "center",
          color: "#181818",
          fontSize: "0.875rem",
          fontWeight: "500",
          lineHeight: "1.25rem",
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#535353",
          fontSize: "0.75rem",
          fontWeight: "500",
          lineHeight: "1.25rem",
          display: "flex",
          alignItems: "center",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "#181818",
          fontWeight: "600",
          fontSize: "0.75rem",
          lineHeight: "1.25rem",
          display: "flex",
          alignItems: "center",
        }),
        menu: (provided) => ({
          ...provided,
          position: "absolute",
          zIndex: 1000,
          backgroundColor: "white",
        }),
        option: (provided, state) => ({
          ...provided,
          fontFamily: "figtree",
          backgroundColor: state.isFocused ? "#f3f3f3" : "white",
          color: state.isFocused ? "#181818" : "#181818",
          padding: "10px",
          cursor: "pointer",
          fontSize: "0.75rem",
          fontWeight: "500",
          lineHeight: "1rem",
        }),
      }}
    />
  );
};

export default GeneralSelect;
