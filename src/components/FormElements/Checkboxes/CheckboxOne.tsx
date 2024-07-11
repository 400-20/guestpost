import { useState } from "react";

const CheckboxOne = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className="flex cursor-pointer select-none items-center text-body-sm font-medium"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="h-4 w-4 mr-2 mt-1 cursor-pointer"
            // className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          {/* <div
            className={`mr-2 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked
                ? "border-red bg-gray-2 dark:bg-transparent"
                : "border-dark-5 dark:border-dark-6"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && "bg-red"}`}
            ></span>
          </div> */}
        </div>
      </label>
    </div>
  );
};

export default CheckboxOne;
