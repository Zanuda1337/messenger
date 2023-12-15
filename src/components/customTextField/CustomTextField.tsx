import React from 'react';
import classes from './CustomTextField.module.scss';
import { OutlinedTextFieldProps, TextField } from '@mui/material';
import { clsx } from 'clsx';
import Typography from 'src/components/typography/Typography';

interface CustomTextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  maxLength?: number;
  hideMaxLength?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  maxLength,
  hideMaxLength = false,
  ...props
}) => {
  console.log((props.value as string)?.length ?? 0);
  return (
    <div className={classes.wrapper}>
      <TextField
        {...props}
        onChange={(event) => {
          props.onChange?.({
            ...event,
            target: {
              ...event.target,
              value:
                maxLength !== undefined
                  ? event.target.value.slice(0, maxLength)
                  : event.target.value,
            },
          });
        }}
        classes={{
          ...props.classes,
          root: clsx(classes.root, props.classes?.root),
        }}
      />
      {maxLength !== undefined && !hideMaxLength && (
        <div className={classes.label}>
          <Typography size={'xs'} color={'secondary'}>
            {maxLength - ((props.value as string)?.length ?? 0)}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CustomTextField;
