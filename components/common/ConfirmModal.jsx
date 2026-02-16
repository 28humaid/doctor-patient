// components/common/ConfirmModal.jsx
'use client';

import { X } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmButtonClass = "bg-[hsl(var(--color-danger))] hover:bg-[hsl(var(--color-danger)/0.9)] text-white", // ← uses your danger color
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div
          className={`
            bg-[var(--bg-card)] rounded-[var(--radius-lg)] 
            shadow-[0_10px_25px_rgba(0,0,0,0.12)] 
            max-w-md w-full overflow-hidden
            transform transition-all duration-200 scale-100
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-[var(--space-5)]">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--color-primary))] rounded-sm transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-[var(--space-6)]">
            <p className="text-[var(--text-secondary)] leading-relaxed">{message}</p>
          </div>

          {/* Footer */}
          <div className="px-6 py-[var(--space-5)] flex justify-end gap-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className={`
                px-5 py-2.5 text-sm font-medium 
                text-[var(--text-secondary)] bg-[var(--color-gray-100)] 
                hover:bg-[var(--color-gray-200)] 
                rounded-[var(--radius)] transition-colors
                disabled:opacity-60 disabled:cursor-not-allowed
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--color-primary))]
              `}
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`
                px-5 py-2.5 text-sm font-medium 
                rounded-[var(--radius)] transition-colors flex items-center gap-2
                disabled:opacity-60 disabled:cursor-not-allowed
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-[hsl(var(--color-primary))]
                ${confirmButtonClass}
              `}
            >
              {isLoading ? "Processing..." : confirmText}
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}