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
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`flex items-center justify-center bg-opacity-20 ${className}`}
      style={{
        width,
        height,
        backgroundColor: randomColor,
        ...style,
      }}
    >
      <span className="text-secondary-dark/70 font-body">{text}</span>
    </div>
  );
};

export default PlaceholderImage; 