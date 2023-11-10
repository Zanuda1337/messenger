import React, { useState } from 'react';
import classes from './CustomIconButton.module.scss';
import { CircularProgress, IconButton, IconButtonProps } from '@mui/material';

interface CustomIconButtonProps extends IconButtonProps {}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({ ...props }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={classes.container}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onFocus={() => {
        setHover(true);
      }}
      onBlur={() => {
        setHover(false);
      }}
    >
      <IconButton classes={{ root: classes.root }} {...props} />
      <CircularProgress
        value={hover ? 100 : 0}
        classes={{
          root: classes.progress,
          colorPrimary: classes.color,
          svg: classes.circle,
        }}
        variant="determinate"
        thickness={1.5}
      />
    </div>
  );
};

export default CustomIconButton;
