import React from 'react';
import classes from './BurgerArrowIcon.module.scss';
import clsx from 'clsx';

interface BurgerArrowIconProps {
  arrow: boolean;
}

const BurgerArrowIcon: React.FC<BurgerArrowIconProps> = ({ arrow }) => {
  return (
    <div className={clsx(classes.root, { [classes.arrow]: arrow })}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default BurgerArrowIcon;
