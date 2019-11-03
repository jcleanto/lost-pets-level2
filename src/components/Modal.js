import React from 'react';

export default function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main radius">
        <div className="modal-close" title="Fechar" onClick={handleClose}>X</div>
        {children}
      </section>
    </div>
  );
}