import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[#F5F0E6] text-[#1C2421] border-[#E5DECE]',
    success: 'bg-[#063C2F]/10 text-[#063C2F] border-[#063C2F]/20',
    warning: 'bg-[#C6A15B]/15 text-[#A8894D] border-[#C6A15B]/30',
    danger: 'bg-[#B9674A]/15 text-[#B9674A] border-[#B9674A]/30',
    info: 'bg-[#062E27]/10 text-[#063C2F] border-[#062E27]/20',
    outline: 'bg-transparent text-[#C6A15B] border-[#C6A15B]/40',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
