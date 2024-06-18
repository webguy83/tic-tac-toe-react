import { useState, useCallback } from 'react';

export const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [cancelText, setCancelText] = useState('');
  const [dialogWinner, setDialogWinner] = useState<'X' | 'O' | null>(null);

  const openDialog = useCallback((message: string, confirm: string, cancel: string, winner: 'X' | 'O' | null) => {
    setDialogMessage(message);
    setConfirmText(confirm);
    setCancelText(cancel);
    setDialogWinner(winner);
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return {
    isDialogOpen,
    dialogMessage,
    confirmText,
    cancelText,
    dialogWinner,
    openDialog,
    closeDialog,
  };
};
