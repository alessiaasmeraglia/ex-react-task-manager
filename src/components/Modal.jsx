import { createPortal } from 'react-dom';

function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = 'Conferma',
}) {
    if (!show) {
        return null;
    }

    return createPortal(
        <div
            className="modal-overlay"
            role="presentation"
            onClick={onClose}
        >
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <h2 id="modal-title">{title}</h2>

                <div className="modal-content">
                    {content}
                </div>

                <div className="modal-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Annulla
                    </button>

                    <button
                        type="button"
                        className="confirm-button"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;