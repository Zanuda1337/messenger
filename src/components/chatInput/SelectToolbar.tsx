import React from 'react';
import classes from './ChatInput.module.scss';
import { clsx } from 'clsx';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import Typography from 'src/components/typography/Typography';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import AnimatedIcon from 'src/components/animatedIcon/AnimatedIcon';
import SlotMachine from 'src/components/slotMachine/SlotMachine';

interface SelectToolbarProps {
  selectedCount: number;
  onCancel: () => void;
  onDelete: () => void;
}

const SelectToolbar: React.FC<SelectToolbarProps> = ({
  selectedCount,
  onCancel,
  onDelete,
}) => {
  return (
    <div className={classes.wrapper}>
      <CustomIconButton onClick={onCancel}>
        <AnimatedIcon icon={'cross'} />
      </CustomIconButton>
      <Typography style={{ width: '100%' }} size={'m'} weight={600}>
        <SlotMachine value={selectedCount} timeout={150} />
      </Typography>
      <div className={clsx(classes.items, classes.gap)}>
        <CustomIconButton>
          <SvgSelector
            id={'reply'}
            style={{ transform: 'scaleX(-1)' }}
            className={classes.toolbarIcon}
          />
        </CustomIconButton>
        <CustomIconButton>
          <SvgSelector
            id={'copy'}
            className={clsx(classes.toolbarIcon, classes.small)}
          />
        </CustomIconButton>
        <CustomIconButton onClick={onDelete}>
          <SvgSelector
            id={'delete'}
            className={clsx(classes.toolbarIcon, 'errorIcon')}
          />
        </CustomIconButton>
      </div>
    </div>
  );
};

export default SelectToolbar;
