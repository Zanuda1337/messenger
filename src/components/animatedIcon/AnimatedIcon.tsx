import React from 'react';
import classes from './AnimatedIcon.module.scss';
import clsx from 'clsx';

interface BurgerArrowIconProps {
  icon: 'burger' | 'cross' | 'arrow';
  color?: 'secondary' | 'tertiary';
}

const AnimatedIcon: React.FC<BurgerArrowIconProps> = ({
  icon,
  color = 'tertiary',
}) => {
  return (
    <div
      className={clsx(classes.root, classes[color], {
        [classes.arrow]: icon === 'arrow',
        [classes.cross]: icon === 'cross',
      })}
    >
      <div />
      <div />
      <div />
    </div>
  );
};

export default AnimatedIcon;
