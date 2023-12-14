/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

function Modal({ openModal, closeModal, children }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="h-max w-max rounded-lg bg-gray-800"
    >
      <div className="grid grid-cols-[1.9fr_0.1fr]">
        {children}
        <button onClick={closeModal} className="flex justify-end items-center w-full h-full hover:bg-gray-200 hover:opacity-50 p-10 text-blue-500">
          X
        </button>
      </div>

    </dialog>
  );
}

export default Modal;