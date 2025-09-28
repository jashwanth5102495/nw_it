import React from 'react';

interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'waiting_for_confirmation' | 'confirmed' | 'rejected' | 'unknown';
  transactionId?: string;
  courseName?: string;
  amount?: number;
}

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
  isOpen,
  onClose,
  status,
  transactionId,
  courseName,
  amount
}) => {
  if (!isOpen) return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'waiting_for_confirmation':
        return {
          title: 'Payment Submitted',
          message: 'Payment submitted, awaiting admin confirmation',
          icon: '⏳',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-800',
          messageColor: 'text-yellow-700'
        };
      case 'confirmed':
        return {
          title: 'Payment Confirmed',
          message: 'Payment verified and approved by admin',
          icon: '✅',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          titleColor: 'text-green-800',
          messageColor: 'text-green-700'
        };
      case 'rejected':
        return {
          title: 'Payment Rejected',
          message: 'Payment rejected by admin',
          icon: '❌',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-800',
          messageColor: 'text-red-700'
        };
      default:
        return {
          title: 'Status Unknown',
          message: 'Status unclear, requires support contact',
          icon: '❓',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-800',
          messageColor: 'text-gray-700'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className={`text-2xl mr-3 ${config.iconColor}`}>{config.icon}</span>
            <h3 className={`text-lg font-semibold ${config.titleColor}`}>{config.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>
        
        <p className={`${config.messageColor} mb-4`}>{config.message}</p>
        
        {transactionId && (
          <div className="mb-3">
            <span className="font-medium text-gray-700">Transaction ID: </span>
            <span className="text-gray-600 font-mono text-sm">{transactionId}</span>
          </div>
        )}
        
        {courseName && (
          <div className="mb-3">
            <span className="font-medium text-gray-700">Course: </span>
            <span className="text-gray-600">{courseName}</span>
          </div>
        )}
        
        {amount && (
          <div className="mb-4">
            <span className="font-medium text-gray-700">Amount: </span>
            <span className="text-gray-600">₹{amount}</span>
          </div>
        )}
        
        {status === 'confirmed' && (
          <div className="bg-green-100 border border-green-300 rounded-md p-3 mb-4">
            <p className="text-green-800 text-sm">
              🎉 Congratulations! You now have access to the course. Check your "My Courses" tab to start learning.
            </p>
          </div>
        )}
        
        {status === 'rejected' && (
          <div className="bg-red-100 border border-red-300 rounded-md p-3 mb-4">
            <p className="text-red-800 text-sm">
              Please contact support for assistance or try submitting your payment again with correct details.
            </p>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusModal;