import { useClickOutside } from "@/hooks";
import { type FC, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import type { SelectionOption } from "src/types/typings.t";
import { Icon } from "@/components";

interface SelectProps {
  selected: any;
  setSelected: any;
  title?: string;
  selectWrapperStyles: string;
  selectabel?: string;
  selectLabelStyles?: string;
  options: SelectionOption[] | string[];
  multiple: boolean;
  selectPanelStyles: string;
  disable?: boolean;
}

const Select: FC<SelectProps> = ({
  selected,
  title,
  setSelected,
  options,
  multiple,
  selectWrapperStyles,
  selectPanelStyles,
  selectabel,
  selectLabelStyles,
  disable,
}) => {
  /**
   * Component states
   */
  const [isSelectPanelOpen, setIsSelectPanelOpen] = useState(false);
  const selectef = useRef<HTMLSelectElement>(null);

  /**
   * Component functions
   */
  const selectOption = (option: SelectionOption | string) => {
    if (multiple) {
      checkIfOptionIsInSelectedArray(option)
        ? setSelected(
            selected.filter((selectedOption: SelectionOption | string) =>
              typeof option === "object" && typeof selectedOption === "object"
                ? selectedOption?.name.toLowerCase() !==
                  option.name.toLowerCase()
                : (selectedOption as string).toLowerCase() !==
                  (option as string).toLowerCase()
            )
          )
        : setSelected([...selected, option]);
    } else {
      // If The Selected Is Not Equal To The Currently Clicked Option
      if (option !== selected) setSelected(option);
    }
  };

  const getActiveOptionClass = (option: SelectionOption | string) => {
    let activeOptionStyles = "";

    if (Array.isArray(selected)) {
      checkIfOptionIsInSelectedArray(option)
        ? (activeOptionStyles = "bg-primary/50")
        : "";
    } else {
      typeof option === "object"
        ? option?.name.toLowerCase() === selected.name.toLowerCase()
          ? (activeOptionStyles = "bg-primary/50 ")
          : ""
        : option.toLowerCase() === selected.toLowerCase()
        ? (activeOptionStyles = "bg-primary/50   ")
        : "";
    }

    return activeOptionStyles;
  };

  const checkIfOptionIsInSelectedArray = (option: SelectionOption | string) => {
    let value: SelectionOption | string | null = null;

    selected.find((selectedOption: SelectionOption | string) => {
      if (typeof option === "object" && typeof selectedOption === "object") {
        selectedOption.name.toLowerCase() === option.name.toLowerCase()
          ? (value = selectedOption)
          : "";
      } else {
        (selectedOption as string).toLowerCase() ===
        (option as string).toLowerCase()
          ? (value = selectedOption)
          : "";
      }
    });

    return value;
  };

  useClickOutside(selectef, () => setIsSelectPanelOpen(false));

  return (
    <section
      ref={selectef}
      tabIndex={0}
      className={`relative cursor-pointer gap-[0.5rem]  px-2 outline-none  ${selectWrapperStyles}`}
      onClick={() =>
        setIsSelectPanelOpen(
          (prevIsSelectPanelOpenState) => !prevIsSelectPanelOpenState
        )
      }
    >
      <div className={`flex items-center justify-between gap-1`}>
        <div className="text-secondary flex flex-1 gap-1 overflow-x-auto whitespace-nowrap  text-sm capitalize scrollbar-hide">
          {selected.length === 0 || !selected
            ? title
            : multiple && Array.isArray(selected)
            ? selected.map((selectedOption, selectedOptionIndex) => (
                <div
                  key={selectedOptionIndex}
                  onClick={(event) => {
                    event.stopPropagation();
                    selectOption(selectedOption);
                  }}
                  className="bg-primary/20 flex items-center rounded-full px-2 tracking-wider"
                >
                  <Icon icon={<HiXMark className="h-3 w-3" />} />
                  <span className="text-sm">
                    {typeof selectedOption === "object"
                      ? selectedOption.name
                      : selectedOption}
                  </span>
                </div>
              ))
            : typeof selected === "object"
            ? (selected as SelectionOption).name
            : selected}
        </div>

        {/* indicator icon */}
        <span
          className={`hover:bg-dark  hover:bg-orange flex items-center justify-center  rounded-full duration-300 hover:text-white ${
            isSelectPanelOpen && "bg-orange rotate-180  rounded-full text-white"
          }  ${disable && "hidden"}`}
        >
          <HiChevronDown className="h-4 w-4" />
        </span>
      </div>

      <ul
        className={`absolute left-0 top-[calc(100%+.25rem)] z-50 flex h-fit  w-full  flex-col
         gap-2 overflow-y-auto rounded-md p-[5px]  text-sm
         ${selectPanelStyles} ${isSelectPanelOpen ? "block" : "hidden"} ${
          disable && "hidden"
        }`}
      >
        {options.map((option, option_index) => (
          <li
            onClick={(event) => {
              event.stopPropagation();
              selectOption(option);
              setIsSelectPanelOpen(false);
            }}
            key={option_index}
            className={`hover:bg-orange/50 hover:text-primary w-fit  rounded-full  px-2 capitalize hover:font-normal ${getActiveOptionClass(
              option || ""
            )}`}
          >
            {typeof option === "object" ? option.name : option}
          </li>
        ))}
      </ul>

      {/* label */}
      <label
        className={`absolute -top-[15px] max-h-[5rem] bg-white text-sm  ${selectLabelStyles}`}
      >
        {selectabel}
      </label>
    </section>
  );
};

export default Select;
