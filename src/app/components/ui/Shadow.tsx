import React, { FC } from 'react';

interface Props {
  color: 'primary' | 'secondary';
  width?: number;
  height?: number;
  top?: number | 'unset';
  left?: number | 'unset';
  right?: number | 'unset';
  bottom?: number | 'unset';
}

const Shadow: FC<Props> = ({
  color,
  width = 255,
  height = 277,
  top = 'unset',
  left = 'unset',
  right = 'unset',
  bottom = 'unset'
}) => {
  const bgColor = {
    primary:
      'radial-gradient(circle at 50% 50%, rgb(67, 217, 173), rgba(76, 0, 255, 0))',
    secondary:
      'radial-gradient(circle at 50% 50%, rgb(77, 91, 206), rgba(76, 0, 255, 0))'
  };

  const rounded = {
    primary: 'rounded-tr-[50%] rounded-bl-[50%]',
    secondary: 'rounded-br-[50%] rounded-bl-[50%]'
  };

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        top,
        left,
        right,
        bottom,
        background: bgColor[color]
      }}
      className={`absolute opacity-50 blur-[70px] ${rounded[color]}`}
    ></div>
  );
};

export default Shadow;
