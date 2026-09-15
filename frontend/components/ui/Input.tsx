import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-[#1C2421] mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-xs">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8D958F]">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`block w-full rounded-lg border text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-[#F5F0E6] disabled:text-[#8D958F] bg-[#FBF8F1] placeholder:text-[#8D958F] ${
            error
              ? 'border-[#B9674A] text-[#B9674A] focus:border-[#B9674A] focus:ring-[#B9674A]/20'
              : 'border-[#DDD4C4] text-[#1C2421] focus:border-[#C6A15B] focus:ring-[#C6A15B]/20'
          } ${leftIcon ? 'pl-10' : 'pl-3.5'} ${rightIcon ? 'pr-10' : 'pr-3.5'} py-2.5 ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8D958F]">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-[#B9674A] font-medium">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-[#8D958F]">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
