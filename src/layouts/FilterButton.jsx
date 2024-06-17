import { useState } from "react";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "All (9)", value: "all" },
    { label: "Full Stack (6)", value: "full-stack" },
    { label: "Front End (1)", value: "front-end" },
    { label: "Freelance (1)", value: "freelance" },
    { label: "New Stack Project (1)", value: "new-stack" },
  ];

  return (
    <div className="relative inline-block text-gray-900 dark:text-gray-100">
      <button
        className="py-2.5 px-3 md:text-sm text-site bg-transparent border border-dimmed focus:border-brand focus:outline-none focus:ring-0 flex items-center justify-between rounded font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        Select Category
      </button>
      {isOpen && (
        <div className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 rounded-md overflow-hidden shadow-lg min-w-[200px] w-max p-1 bg-gray-100 dark:bg-gray-800 border border-dimmed text-xs md:text-sm">
          {options.map((option) => (
            <div
              key={option.value}
              className="block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md"
              onClick={() => console.log(option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
