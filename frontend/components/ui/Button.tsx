import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg cursor-pointer';

  const variantStyles = {
    primary: 'bg-[#C6A15B] text-[#022C24] font-semibold hover:bg-[#B8934E] active:bg-[#A8894D] focus:ring-[#C6A15B] shadow-xs hover:shadow',
    secondary: 'bg-[#063C2F] text-[#FBF8F1] hover:bg-[#022C24] active:bg-[#011B16] focus:ring-[#063C2F] border border-[#063C2F]',
    outline: 'border border-[#C6A15B]/50 text-[#063C2F] bg-[#FBF8F1] hover:bg-[#F5F0E6] hover:border-[#C6A15B] focus:ring-[#C6A15B]',
    ghost: 'text-[#1C2421] hover:text-[#063C2F] hover:bg-[#F5F0E6] focus:ring-[#C6A15B]',
    danger: 'bg-[#B9674A] text-[#FBF8F1] hover:bg-[#A5573C] focus:ring-[#B9674A] shadow-xs',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 gap-2',
    lg: 'text-sm sm:text-base px-6 py-2.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
