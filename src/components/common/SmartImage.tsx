"use client";

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import PlaceholderImage from './PlaceholderImage';

interface SmartImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  placeholderText?: string;
}

export default function SmartImage({ src, alt, placeholderText, className, ...rest }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <PlaceholderImage
        text={placeholderText || alt || 'Image'}
        className={`w-full h-full ${className || ''}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
