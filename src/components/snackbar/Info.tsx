import React from 'react';
import classes from './Snackbar.module.scss';
import { CustomContentProps, SnackbarContent } from 'notistack';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import clsx from 'clsx';
import Typography from 'src/components/typography/Typography';

// eslint-disable-next-line react/display-name
const Info = React.forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, message, ...props }, ref) => {
    return (
      <SnackbarContent ref={ref} {...props}>
        <div className={clsx(classes.snackbar, classes.info)}>
          <SvgSelector id="info" />
          {typeof message === 'string' && (
            <Typography color={'primary-light'}>{message}</Typography>
          )}
        </div>
      </SnackbarContent>
    );
  }
);

export default Info;
