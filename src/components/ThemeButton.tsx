import React, { ReactNode } from 'react';
import '../styles/themeButton.scss';

interface ThemedButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ children, onClick, variant, disabled = false }) => {
  return (
    <button type='button' className={`themed-button ${variant} ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ThemedButton;
