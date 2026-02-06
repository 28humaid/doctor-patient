// components/common/LoadingSpinner.jsx
export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-[hsl(var(--color-primary))] rounded-full animate-spin"></div>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
}