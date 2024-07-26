import React from "react";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, onClick }) => {
  const genericHamburgerLine = `h-1 my-1 rounded-full transition ease transform duration-300`;

  return (
    <button
      className={`flex flex-col h-14 w-14 cursor-pointer bg-[#313131] rounded-xl justify-center items-center group absolute ${
        isOpen ? "lg:left-4 right-4" : "left-4"
      } z-20 top-7 p-1`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <div
          className={`${genericHamburgerLine} w-10 bg-white ${
            isOpen ? "rotate-45 translate-y-1.5" : "group-hover:opacity-100"
          }`}
        />
        <div
          className={`${genericHamburgerLine}  bg-[#019A5A] ${
            isOpen
              ? "w-10 -rotate-45 -translate-y-1.5 "
              : "group-hover:opacity-100 w-8"
          }`}
        />
      </div>
    </button>
  );
};

export default Hamburger;
