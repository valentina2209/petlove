import Select from "react-select";
import { components } from "react-select";
import css from "./SelectField.module.css"


const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <svg 
      width="18" 
      height="18" 
      style={{ 
        transform: props.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
        transition: "transform 0.2s", 
      }}
    >
      <use href="/public/sprite.svg#icon-chevron-down" />
    </svg>
  </components.DropdownIndicator>
);

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value?: Option | null;
  placeholder: string;
  onChange: (value: string | null) => void;
  isSearchable?: boolean;
  onInputChange?: (value: string) => void;
  className?: string;
};

export const SelectField = ({
  options,
  value,
  placeholder,
  onChange,
  isSearchable = false,
  onInputChange,
  className,
}: Props) => {
  return (
      <div className={`${css.selectContainer} ${className}`}>
        <Select
            classNamePrefix="customSelect"
            options={options}
            value={value}
            placeholder={placeholder}
            isSearchable={isSearchable}
            onInputChange={onInputChange}
            components={{ DropdownIndicator }}
            onChange={(option) => onChange(option ? (option as Option).value : null)}
            unstyled 
        /> 
      </div>
        
  );
};

