import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { playSuccessSound, playErrorSound } from '../../lib/sounds';

export const Toast = ({ message, type = 'default', onClose }) => {
  useEffect(() => {
    // Play appropriate sound when toast appears
    if (type === 'success') {
      playSuccessSound();
    } else if (type === 'error') {
      playErrorSound();
    }
  }, [type]);

  return createPortal(
    <div
      className={cn(
        'fixed top-4 right-4 z-50 min-w-[200px] max-w-md p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0',
        'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
        type === 'error' && 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100',
        type === 'success' && 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
      )}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <X size={16} />
      </button>
      <div className="pr-6">
        {message}
      </div>
    </div>,
    document.body
  );
}; 