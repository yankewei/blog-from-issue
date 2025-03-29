// Update the component to accept className prop
export const ListboxWrapper = ({ children, className = "" }) => (
  <div className={`w-full max-w-3xl px-4 py-3 rounded-md border-default-200 dark:border-default-100 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 ${className}`}>
    {children}
  </div>
);
