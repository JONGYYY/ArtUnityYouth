import { motion } from 'framer-motion';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
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
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-body transition-all';
  
  const variants = {
    primary: 'bg-primary-coral text-white hover:shadow-glow',
    secondary: 'bg-primary-teal text-white hover:shadow-glow',
    outline: 'border-2 border-primary-coral text-primary-coral hover:bg-primary-coral hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  const content = href ? (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  ) : (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );

  if (isAnimated) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={fullWidth ? 'w-full' : 'inline-block'}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Button; 