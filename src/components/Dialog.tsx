import React from 'react';
import '../styles/dialog.scss';
import ThemedButton from './ThemeButton';
import iconX from '../assets/icon-x.svg';
import iconO from '../assets/icon-o.svg';

interface DialogProps {
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  closeOnBackgroundClick?: boolean;
  dialogWinner?: 'X' | 'O' | null; // Prop for the winner
}

const Dialog: React.FC<DialogProps> = ({ message, confirmText, cancelText, onConfirm, onCancel, isOpen, closeOnBackgroundClick = true, dialogWinner }) => {
  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (closeOnBackgroundClick) {
      onCancel();
    }
  };

  const handleDialogClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={`dialog-overlay ${isOpen ? 'open' : 'close'}`} onClick={handleBackgroundClick}>
      <div className='dialog-container' onClick={handleDialogClick} role='dialog' aria-modal='true' aria-labelledby='dialog-message'>
        <div className='dialog-content'>
          {dialogWinner && (
            <div className={`winner-message winner-${dialogWinner.toLowerCase()}`}>
              <h1>PLAYER {dialogWinner === 'X' ? '1' : '2'} WINS!</h1>
              <div className='winner-header'>
                <img src={dialogWinner === 'X' ? iconX : iconO} alt={dialogWinner} />
                <p>TAKES THE ROUND</p>
              </div>
            </div>
          )}
          {!dialogWinner && (
            <p id='dialog-message' className='dialog-message'>
              {message}
            </p>
          )}
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
