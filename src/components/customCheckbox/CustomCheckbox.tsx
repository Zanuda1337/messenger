import React from 'react';
import classes from './CustomCheckbox.module.scss';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { clsx } from 'clsx';

interface TCustomCheckboxProps {
  checked?: boolean;
  onChange?: () => void;
}

const CustomCheckbox: React.FC<TCustomCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <button
      className={clsx(classes.border, { [classes.checked]: checked })}
      onClick={onChange}
    >
      <div className={classes.checkmark}>
        <SvgSelector id={'checkCircle'} />
      </div>
    </button>
  );
};

export default CustomCheckbox;
