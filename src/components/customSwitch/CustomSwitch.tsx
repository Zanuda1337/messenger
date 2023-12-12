import { Switch } from '@mui/material';
import React from 'react';
import classes from './CustomSwitch.module.scss';
import { SwitchProps } from '@mui/material/Switch/Switch';

interface TCustomSwitchProps extends SwitchProps {}

const CustomSwitch: React.FC<TCustomSwitchProps> = ({ ...props }) => {
  return <Switch classes={{ root: classes.root }} {...props} />;
};

export default CustomSwitch;
