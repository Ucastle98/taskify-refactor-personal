import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../lib/cn';

type ButtonVariant = 'v' | 'w' | 'wv' | 'add' | 'icon';
// v: violet, w: white, wv: bg-white text-violet, add: dashboard add

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

export default function Button({ className, children, variant = 'w', ...props }: ButtonProps) {
  // default: rounded-6, 폰트 16px 굵기 medium
  const baseStyle = cn(
    'inline-flex justify-center items-center transition-all duration-150 rounded-md font-medium bg-white',
    'disabled:bg-[#9FA6B2] disabled:text-white disabled:opacity-50',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5534DA] focus-visible:ring-offset-2',
  );

  const variantStyle = {
    v: 'bg-[#5534DA] text-white hover:brightness-95 active:brightness-80',
    wv: 'text-[#5534DA] border border-[#D9D9D9] hover:bg-[#F5F5F5]',
    w: 'text-[#787486] border border-[#D9D9D9] hover:bg-[#F5F5F5]',
    add: 'font-semibold border border-[#D9D9D9] hover:bg-[#F5F5F5]',
    icon: 'border-0 bg-transparent p-0 hover:bg-transparent active:bg-transparent shadow-none',
  }[variant];

  return (
    <button className={cn(baseStyle, variantStyle, className)} {...props}>
      {children}
    </button>
  );
}
