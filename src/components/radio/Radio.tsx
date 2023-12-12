import React from 'react';
import classes from './Radio.module.scss';
import clsx from 'clsx';

interface RadioProps {
  active?: boolean;
}

const Radio: React.FC<RadioProps> = ({ active = false }) => {
  return (
    <span className={classes.border}>
      <div className={clsx(classes.dot, { [classes.active]: active })} />
    </span>
  );
};

export default Radio;
