import "./CustomSelect.scss";

interface ICustomSelect {
  currentValue: string;
  setSelect: Function;
  colorOnly: boolean;
  values: Array<any>;
  displayUp: boolean;  // Display the dropdown on top and not the bottom;
}

// Component function to have custom select. 
// Includes lot of dom manipulation to render styles and animations

const CustomSelect = (props: React.PropsWithChildren<ICustomSelect>) => {
  const { colorOnly, currentValue, displayUp, setSelect, values } = props;

  // Render each options
  const renderOptions = (value: Array<any>) => {
    return value.map((x) => (
      <li key={x} onClick={(e) => selectValue(e)} className="dropdown-select-item">
        {colorOnly ? <span className="select-color-todo" style={{ backgroundColor: `${x}` }}></span> : x}
      </li>
    ));
  };

  // Display the select dropdown + animations
  const toggleDropdown = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // Get Dom elements
    const dropdown = (e.currentTarget as HTMLElement).nextSibling as HTMLElement;
    const arrow = (e.currentTarget as HTMLElement).children[0] as HTMLElement;
    const arrowUp = (e.currentTarget as HTMLElement).children[1] as HTMLElement;
    dropdown.classList.toggle("show-content");

     // Dependng on the style puts the arrow back in places
    if (!displayUp) {
      arrow.classList.toggle("arrow-select-down")
      arrow.classList.toggle("arrow-select-up")
    };
    
    if (displayUp) {
      dropdown.classList.toggle("show-content-up");
      arrowUp.classList.toggle("arrow-select-up");
      arrowUp.classList.toggle("arrow-select-down")
    }
  };

  const selectValue = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // Get Dom elements
    const dropdown = (e.currentTarget as HTMLElement).parentNode as HTMLElement;
    const arrowParent = (e.currentTarget as HTMLElement).parentElement?.parentElement;
    const arrow = arrowParent?.children[0].children[0];
    const arrowUp = arrowParent?.children[0].children[1];

    // Handle the change select value
    // If used for colors then select the appropriate color
    if (colorOnly) {
      let selectColorTodo = e.currentTarget.children[0];
      let style = getComputedStyle(selectColorTodo!);
      setSelect(style.backgroundColor);
    }

    // Otherwise simply use the text value
    else setSelect((e.target as HTMLSpanElement).textContent);
    dropdown.classList.remove("show-content");

    // Dependng on the style puts the arrow back in places
    if (!displayUp) {
      arrow!.classList.remove("arrow-select-up")
      arrow!.classList.add("arrow-select-down");
    };

    if (displayUp) {
      dropdown.classList.remove("show-content-up");
      arrowUp!.classList.remove("arrow-select-down");
      arrowUp!.classList.add("arrow-select-up");
    }
  };

  const arrowType = () => {
    if (displayUp)
    return "arrow-select-up"
    else 
    return "arrow-select-down"
  }

  return (
    <div className="custom-select-dropdown">
      <span className="span-current-value" onClick={(e) => toggleDropdown(e)}>
        {colorOnly ? (
          <span className="select-color-todo" style={{ backgroundColor: `${currentValue}` }}></span>
        ) : (
          currentValue
        )}
        <span className={`arrow-select-dropdown ${arrowType()}`}></span>
      </span>
      <ul className="dropdown-select-content">{renderOptions(values)}</ul>
    </div>
  );
};

export default CustomSelect;
