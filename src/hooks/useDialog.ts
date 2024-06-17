import { useState } from 'react';

export const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [cancelText, setCancelText] = useState('');

  const openDialog = (message: string, confirm: string, cancel: string) => {
    setDialogMessage(message);
    setConfirmText(confirm);
    setCancelText(cancel);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    dialogMessage,
    confirmText,
    cancelText,
    openDialog,
    closeDialog,
  };
};
