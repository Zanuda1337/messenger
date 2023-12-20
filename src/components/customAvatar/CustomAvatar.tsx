import { Avatar } from '@mui/material';
import React from 'react';
import clsx from 'clsx';
import { stringToColor } from 'src/utils';

const Size = {
  tiny: 30,
  small: 35,
  medium: 48,
  large: 105,
};

type Sizes = keyof typeof Size;

export interface AvatarProps {
  name: string;
  size?: Sizes;
  className?: string;
  src?: string | null;
}

const CustomAvatar: React.FC<AvatarProps> = ({
  name,
  className,
  size = 'small',
  src,
}) => {
  return (
    <Avatar
      src={src ?? ''}
      className={clsx(className)}
      sx={{
        bgcolor: stringToColor(name),
        width: Size[size],
        height: Size[size],
        fontSize: Size[size] * 0.45,
      }}
    >{`${name.split(' ')[0][0]?.toUpperCase()}${
      name.split(' ')[1]?.at(0)?.toUpperCase() ?? ''
    }`}</Avatar>
  );
};

export default CustomAvatar;
