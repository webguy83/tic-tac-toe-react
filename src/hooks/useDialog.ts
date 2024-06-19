import { useState, useCallback } from 'react';

export const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [cancelText, setCancelText] = useState('');
  const [dialogWinner, setDialogWinner] = useState<'X' | 'O' | null>(null);
  const [isRestartDialog, setIsRestartDialog] = useState(false);

  const openDialog = useCallback((message: string, confirm: string, cancel: string, winner: 'X' | 'O' | null, isRestart: boolean = false) => {
    setDialogMessage(message);
    setConfirmText(confirm);
    setCancelText(cancel);
    setDialogWinner(winner);
    setIsRestartDialog(isRestart);
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
    isRestartDialog,
    openDialog,
    closeDialog,
  };
};
