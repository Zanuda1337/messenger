import React, { useState } from 'react';
import classes from './CustomIconButton.module.scss';
import { CircularProgress, IconButton, IconButtonProps } from '@mui/material';
import { clsx } from 'clsx';

interface CustomIconButtonProps extends IconButtonProps {
  disableProgressOnHover?: boolean;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  className,
  disableProgressOnHover = false,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const enableHover = (): void => {
    if (disableProgressOnHover) return;
    setHover(true);
  };
  const disableHover = (): void => {
    if (disableProgressOnHover) return;
    setHover(false);
  };
  return (
    <div
      className={clsx(classes.container, className, {
        [classes.small]: props.size === 'small',
      })}
      onMouseEnter={enableHover}
      onMouseLeave={disableHover}
      onFocus={enableHover}
      onBlur={disableHover}
    >
      <IconButton classes={{ root: classes.root }} {...props} />
      <CircularProgress
        value={hover ? 100 : 0}
        classes={{
          root: classes.progress,
          colorPrimary: classes.color,
          svg: classes.circle,
        }}
        size={props.size === 'small' ? 28 : 40}
        variant="determinate"
        thickness={1.5}
      />
    </div>
  );
};

export default CustomIconButton;
