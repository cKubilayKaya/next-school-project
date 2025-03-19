import React from "react";
import { CloseIcon } from "./Icons/Icons";

export default function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000c5] flex justify-center items-center z-[1000]" onClick={handleClickOutside}>
      <div className="bg-[#161515] p-6 rounded-lg w-[500px] transform transition-all duration-300 ease-in-out relative flex items-center border border-[#2e2d2d]">
        <button
          className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full p-2 cursor-pointer bg-[#464141] z-[1001]"
          onClick={closeModal}
        >
          <CloseIcon size={20} color={"#fff"} />
        </button>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
