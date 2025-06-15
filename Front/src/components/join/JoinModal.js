import "./JoinModal.css"; 

const JoinModal = ({ show, onHide, children }) => {
  if (!show) return null;   

  return (
    <div className="modal-overlay" onClick={onHide}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default JoinModal;