import React from 'react';
import { Button } from '@mui/material';
import styles from './ListItem.module.scss';
import SvgSelector, {
  SvgSelectorProps,
} from 'src/components/svgSelector/SvgSelector';
import Typography, {
  TypographyProps,
} from 'src/components/typography/Typography';
import { clsx } from 'clsx';

interface ListItemProps {
  title: string;
  iconId?: string;
  slotProps?: {
    icon?: Omit<SvgSelectorProps, 'id'>;
    titleProps?: Omit<TypographyProps, 'children'>;
    subtitleProps?: Omit<TypographyProps, 'children'>;
  };
  subtitle?: string;
  endAdornment?: JSX.Element;
  className?: string;
  slots?: {
    icon: JSX.Element;
  };
  classes?: { root?: string; block?: string };
  disabled?: boolean;
  disableRipple?: boolean;
  onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  subtitle,
  iconId,
  title,
  endAdornment,
  slotProps = {},
  slots,
  disabled,
  className,
  onClick,
  classes,
  disableRipple,
}) => (
  <Button
    classes={{ root: clsx(styles.item, className, classes?.root) }}
    onClick={onClick}
    disabled={disabled}
    disableFocusRipple
    disableRipple={disableRipple}
  >
    <div className={clsx(styles.block, classes?.block)}>
      {slots?.icon ?? (
        <SvgSelector
          id={iconId ?? 'placeholder'}
          {...slotProps?.icon}
          className={clsx(slotProps?.icon?.className, styles.svg)}
        />
      )}
      <div className={styles.textContainer}>
        <Typography
          color={'primary'}
          size={'m'}
          weight={600}
          {...slotProps?.titleProps}
        >
          {title}
        </Typography>
        {subtitle !== undefined && (
          <Typography {...slotProps?.subtitleProps}>{subtitle}</Typography>
        )}
      </div>
    </div>
    {endAdornment !== undefined && endAdornment}
  </Button>
);

export default ListItem;
