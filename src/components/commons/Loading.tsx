import React from 'react';

interface LoadingModalProps {
  visible: boolean;
  text?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible, text = "Loading..." }) => {
  if (!visible) return null;

  return (
    <div className="custom_modal-overlay">
      <div className="custom_modal-content">
        <div className="custom_loader"></div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
