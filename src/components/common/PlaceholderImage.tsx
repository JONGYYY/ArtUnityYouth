import { CSSProperties } from 'react';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
  style?: CSSProperties;
}

const PlaceholderImage = ({
  width = 400,
  height = 300,
  text = 'Placeholder',
  className = '',
  style = {},
}: PlaceholderImageProps) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A06CD5'];
  // Derived from the text so server and client render the same color.
  const hash = [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0);
  const color = colors[hash % colors.length];

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width,
        height,
        backgroundColor: `${color}33`,
        ...style,
      }}
    >
      <span className="text-secondary-dark/70 font-body">{text}</span>
    </div>
  );
};

export default PlaceholderImage; 