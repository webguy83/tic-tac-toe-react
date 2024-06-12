import React from 'react';
import '../styles/dialog.scss';
import ThemedButton from './ThemeButton';

interface DialogProps {
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  closeOnBackgroundClick?: boolean;
}

const Dialog: React.FC<DialogProps> = ({ message, confirmText, cancelText, onConfirm, onCancel, isOpen, closeOnBackgroundClick = true }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (closeOnBackgroundClick) {
      onCancel();
    }
  };

  const handleDialogClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click event from bubbling up to the background
  };

  return (
    <div className='dialog-overlay' onClick={handleBackgroundClick}>
      <div className='dialog-container' onClick={handleDialogClick} role='dialog' aria-modal='true' aria-labelledby='dialog-message'>
        <div className='dialog-content'>
          <p id='dialog-message' className='dialog-message'>
            {message}
          </p>
          <div className='dialog-actions'>
            <ThemedButton onClick={onCancel} variant='tertiary'>
              {cancelText}
            </ThemedButton>
            <ThemedButton onClick={onConfirm} variant='primary'>
              {confirmText}
            </ThemedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
