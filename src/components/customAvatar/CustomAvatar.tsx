import { Avatar } from '@mui/material';
import React from 'react';
import clsx from 'clsx';
import { stringToColor } from 'src/utils';

const Size = {
  tiny: 30,
  small: 35,
  medium: 48,
  large: 60,
};

type Sizes = keyof typeof Size;

interface AvatarProps {
  name: string;
  size?: Sizes;
  className?: string;
}

const CustomAvatar: React.FC<AvatarProps> = ({
  name,
  className,
  size = 'small',
}) => {
  return (
    <Avatar
      className={clsx(className)}
      sx={{
        bgcolor: stringToColor(name),
        width: Size[size],
        height: Size[size],
        fontSize: Size[size] * 0.45,
      }}
    >{`${name.split(' ')[0][0]}${name.split(' ')[1]?.at(0) ?? ''}`}</Avatar>
  );
};

export default CustomAvatar;
