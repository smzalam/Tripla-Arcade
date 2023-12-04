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
      {children}
      <button onClick={closeModal} className="w-full p-10 text-blue-500">
        Close
      </button>
    </dialog>
  );
}

export default Modal;