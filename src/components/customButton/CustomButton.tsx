import React from 'react';
import classes from './CustomButton.module.scss';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';

export interface CustomButtonProps extends Omit<ButtonProps, 'color'> {
  color?:
    | 'text-primary'
    | 'text-tertiary'
    | 'text-secondary'
    | 'primary'
    | 'error';
  fetching?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  color = 'primary',
  children,
  onClick,
  fetching,
  ...props
}) => {
  return (
    <div className={classes.wrapper}>
      <Button
        {...props}
        onClick={(event) => {
          if (fetching === true) return;
          onClick?.(event);
        }}
        classes={{
          root: clsx(classes.root, color, { [classes.fetching]: fetching }),
        }}
      >
        {children}
      </Button>
      <CSSTransition
        timeout={{ appear: 0, enter: 700, exit: 0 }}
        in={fetching}
        unmountOnExit
        classNames={{
          enter: classes.enter,
          enterActive: classes.enterActive,
          exit: classes.exit,
          exitActive: classes.exitActive,
        }}
      >
        <div>
          <CircularProgress classes={{ root: classes.progress }} size={24} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default CustomButton;
