import { useState } from "react";
import "./CustomSelect.scss";

const CustomSelect = () => {
  const options = ["value", "value2", "value3", "value4"];

  const [currentValue, setCurrentValue] = useState(options[0]);

  const renderOptions = (value: Array<string>) => {
    return value.map((x) => (
      <button key={x} onClick={(e) => selectValue(e)}>
        {x}
      </button>
    ));
  };

  const toggleDropdown = () => {
    const dropdown = document.querySelector(".dropdown-content");
    dropdown?.classList.toggle("show-content");
  };

  const selectValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
   // e.stopPropagation();
    const value = (e.target as HTMLButtonElement).textContent;
    setCurrentValue(value!);
    const dropdown = document.querySelector(".dropdown-content");
    dropdown?.classList.remove("show-content");
  };

  return (
    <div className="custom-select">
      <div className="custom-select-dropdown">
        <span onClick={() => toggleDropdown()}>{currentValue}</span>
        <div className="dropdown-content">{renderOptions(options)}</div>
      </div>
    </div>
  );
};

export default CustomSelect;
