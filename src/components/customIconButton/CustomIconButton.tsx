import React, { useState } from 'react';
import classes from './CustomIconButton.module.scss';
import { CircularProgress, IconButton, IconButtonProps } from '@mui/material';
import { clsx } from 'clsx';

interface CustomIconButtonProps extends Omit<IconButtonProps, 'color'> {
  disableProgressOnHover?: boolean;
  color?:
    | 'text-primary'
    | 'text-tertiary'
    | 'text-secondary'
    | 'primary'
    | 'error';
  fetching?: boolean;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  className,
  disableProgressOnHover = false,
  color,
  fetching = false,
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
      className={clsx(classes.container, className, color, {
        [classes.small]: props.size === 'small',
        [classes.large]: props.size === 'large',
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
          root: clsx(classes.progress, {
            [classes.hidden]: disableProgressOnHover,
            [classes.active]: fetching,
          }),
          colorPrimary: fetching ? classes.light : classes.color,
          svg: classes.circle,
        }}
        size={props.size === 'small' ? 28 : 40}
        variant={fetching ? 'indeterminate' : 'determinate'}
        thickness={1.5}
      />
    </div>
  );
};

export default CustomIconButton;
