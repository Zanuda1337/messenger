import React from 'react';
import classes from './CustomSlider.module.scss';
import Typography from 'src/components/typography/Typography';
import { Slider, SliderProps } from '@mui/material';

interface TCustomSliderProps extends Omit<SliderProps, 'size'> {
  value: number;
  label: string;
}

const CustomSlider: React.FC<TCustomSliderProps> = ({
  value,
  label,
  ...props
}) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.labelContainer}>
        <Typography weight={600} size={'m'}>
          {label}
        </Typography>
        <Typography color={'tertiary'} weight={600}>
          {value}
        </Typography>
      </div>
      <Slider
        {...props}
        size={'small'}
        autoFocus
        slotProps={{ thumb: { tabIndex: 1 } }}
        value={value}
      />
    </div>
  );
};

export default CustomSlider;
