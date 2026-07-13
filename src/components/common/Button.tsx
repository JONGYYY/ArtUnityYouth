import { motion } from 'framer-motion';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isAnimated?: boolean;
  href?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isAnimated = true,
  className = '',
  href,
  ...props
}: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-body font-semibold tracking-widest uppercase rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust';

  const variants = {
    primary:   'bg-rust text-cream hover:bg-ink',
    secondary: 'bg-teal text-cream hover:bg-ink',
    outline:   'border border-ink/30 text-ink hover:border-rust hover:text-rust',
    ghost:     'text-rust hover:text-ink underline underline-offset-4',
  };

  const sizes = {
    sm: 'text-xs px-5 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-sm px-8 py-4',
  };

  const combined = `${base} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  const inner = href ? (
    <Link href={href} className={combined}>{children}</Link>
  ) : (
    <button className={combined} {...props}>{children}</button>
  );

  if (!isAnimated) return inner;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={fullWidth ? 'w-full' : 'inline-block'}
    >
      {inner}
    </motion.div>
  );
};

export default Button;
