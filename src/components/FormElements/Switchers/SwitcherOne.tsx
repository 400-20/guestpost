import { useState } from "react";

const SwitcherOne = ({ onClick }: { onClick?: () => void }) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const handleToggle = () => {
    setEnabled(!enabled);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <label
        htmlFor="toggle1"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle1"
            className="sr-only"
            onChange={handleToggle}
            checked={enabled}
          />
          <div className="block h-6 w-10 rounded-full bg-gray-300 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-gray-500 shadow-switch-1 transition ${
              enabled
                ? "right-1 translate-x-full bg-primary dark:bg-white"
                : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherOne;

