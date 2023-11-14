"use client";

import { X } from "lucide-react";

interface Props {
  modal_id: string;
  Toggler: () => JSX.Element;
  children: React.ReactNode;
  modalClassName?: string;
}

export default function Modal({
  modal_id,
  Toggler,
  modalClassName,
  children,
}: Props) {
  return (
    <>
      <div
        onClick={(e) => {
          const element = document.getElementById(modal_id) as any;
          element?.showModal();
        }}
      >
        <Toggler />
      </div>
      <dialog id={modal_id} className="modal modal-bottom sm:modal-middle">
        <div className={`modal-box ${modalClassName}`}>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X />
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </>
  );
}
