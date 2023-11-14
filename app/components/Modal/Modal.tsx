import { Button, Modal as RestartModal } from "@restart/ui";
import { useState } from "react";

interface Props {
  show: boolean;
  onHide: () => void;
  modalClassName?: string;
  children: React.ReactNode;
}

export default function Modal({
  show,
  onHide,
  modalClassName,
  children,
}: Props) {
  return (
    <RestartModal
      show={show}
      aria-labelledby="modal-1-label"
      onHide={onHide}
      renderBackdrop={(props) => (
        <div
          {...props}
          className="fixed inset-0 bg-black/30 z-[300] backdrop-blur"
        />
      )}
      className={`fixed z-[301] top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white shadow-lg overflow-auto h-full ${modalClassName}`}
    >
      <>{children}</>
    </RestartModal>
  );
}
