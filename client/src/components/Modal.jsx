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
      className="h-max w-1/2 rounded-lg bg-background"
    >
      <div className="flex justify-between">
        {children}
        <button onClick={closeModal} className="hover:bg-gray-200 hover:opacity-50 p-10 text-text hover:text-black">
          X
        </button>
      </div>

    </dialog>
  );
}

export default Modal;