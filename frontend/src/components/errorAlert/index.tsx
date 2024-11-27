import React from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  if (!message) return null; // Não exibir se não houver mensagem

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded shadow-md z-50">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-2 bg-white text-red-500 px-2 py-1 rounded hover:bg-gray-200"
      >
        Fechar
      </button>
    </div>
  );
};

export default ErrorAlert;
