import React from "react";
import Select from "react-select";
const ReactSelect = ({ options, value, onChange, isMulti = false }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti={isMulti}
      placeholder={"select a value..."}
      styles={{
        control: (provided) => ({
          ...provided,
          borderColor: "#ccc",
          borderRadius: "6px",
          padding: "2px",
          outline: "none",
          height: "2.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#181818",
          fontSize: "0.875rem",
          fontWeight: "500",
          lineHeight: "1.25rem",
        }),
        menu: (provided) => ({
          ...provided,
          position: "absolute",
          zIndex: 1000,
          backgroundColor: "white",
        }),
        option: (provided, state) => ({
          ...provided,
          fontFamily: state.data.value,
          backgroundColor: state.isFocused ? "#f3f3f3" : "white",
          color: state.isFocused ? "#181818" : "#181818",
        }),
      }}
    />
  );
};

export default ReactSelect;
