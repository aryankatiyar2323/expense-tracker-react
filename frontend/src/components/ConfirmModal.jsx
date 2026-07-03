function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal confirm-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-icon">🗑️</div>

        <h2>{title}</h2>

        <p>{message}</p>

        <span className="confirm-warning">
          This action cannot be undone.
        </span>

        <div className="confirm-actions">
          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;