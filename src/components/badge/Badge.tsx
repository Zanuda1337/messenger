import React from 'react';
import classes from './Badge.module.scss';
import clsx from 'clsx';
import Typography from 'src/components/typography/Typography';

interface BadgeProps {
  variant: 'dot' | 'standard' | 'standard-pale';
  value?: number;
  className?: string;
  color?: 'primary' | 'pale';
}

const Badge: React.FC<BadgeProps> = ({
  variant,
  value,
  className,
  color = 'primary',
}) => {
  return (
    <div>
      <div
        className={clsx(
          classes.circle,
          {
            [classes.standard]: variant === 'standard',
          },
          { [classes.pale]: color === 'pale' },
          className
        )}
      >
        <Typography size={'xs'} color={'primary-light'}>
          {variant === 'standard' && value !== undefined
            ? value.toString()
            : ''}
        </Typography>
      </div>
    </div>
  );
};

export default Badge;
