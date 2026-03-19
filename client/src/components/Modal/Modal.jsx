import React from "react";
import ReactDOM from "react-dom";
import "./ModalStyle.css";
import Button from "../button/Button";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <Button className="modal-close" onClick={onClose}>
          X
        </Button>

        {children}
      </div>
    </div>,
    document.body,
  );
}
