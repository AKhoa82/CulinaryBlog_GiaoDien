import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  return (
    <div
      className={`animate-pulse bg-[#E8E2D5] ${variantStyles[variant]} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
};

export const RecipeCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FFFDF8] rounded-2xl border border-[#E5DFD3] overflow-hidden shadow-xs">
      <Skeleton variant="rectangular" className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton variant="rounded" width={80} height={22} />
          <Skeleton variant="text" width={60} height={18} />
        </div>
        <Skeleton variant="text" className="h-6 w-5/6" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-2/3" />
        <div className="pt-3 border-t border-[#EDE7DD] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={28} height={28} />
            <Skeleton variant="text" width={90} height={16} />
          </div>
          <Skeleton variant="text" width={50} height={16} />
        </div>
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 5 }) => {
  return (
    <tr className="border-b border-[#EDE7DD] animate-pulse">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="py-4 px-4">
          <Skeleton variant="text" className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
};

export const DashboardStatSkeleton: React.FC = () => {
  return (
    <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#E5DFD3] shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width={100} height={18} />
        <Skeleton variant="circular" width={36} height={36} />
      </div>
      <Skeleton variant="text" width={120} height={32} />
      <Skeleton variant="text" width={80} height={16} />
    </div>
  );
};
