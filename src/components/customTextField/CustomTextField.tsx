import React from 'react';
import classes from './CustomTextField.module.scss';
import { OutlinedTextFieldProps, TextField } from '@mui/material';
import { clsx } from 'clsx';

interface CustomTextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'> {
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ ...props }) => {
  return (
    <TextField
      {...props}
      classes={{
        ...props.classes,
        root: clsx(classes.root, props.classes?.root),
      }}
    />
  );
};

export default CustomTextField;
