import React from 'react';

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const CommonInput = React.forwardRef<HTMLInputElement, CommonInputProps>(({ containerClassName = '', className = '', ...props }, ref) => (
  <div className={`animate-input-container w-full mt-1 ${containerClassName}`}>
    <input
      ref={ref}
      className={`w-full bg-transparent border-none outline-none shadow-none px-0 py-2 text-sm placeholder:italic placeholder:text-gray-400 ${className}`}
      {...props}
    />
  </div>
));

export default CommonInput;
