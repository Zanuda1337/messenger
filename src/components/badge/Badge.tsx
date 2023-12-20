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

// eslint-disable-next-line react/display-name
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant, value, className, color = 'primary' }, ref) => {
    return (
      <div ref={ref}>
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
  }
);

export default Badge;
